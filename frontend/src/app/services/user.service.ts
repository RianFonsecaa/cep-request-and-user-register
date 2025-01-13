
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jsonServerUrl: string = environment.jsonServerUrl;

  private usersSubject = new BehaviorSubject<User[]>([]); // Usando BehaviorSubject para garantir a reatividade
  users$: Observable<User[]> = this.usersSubject.asObservable();

  private userSubject = new Subject<User | null>();
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.fetchUsers(); // Inicializa a lista de usuários
  }

  emitUser(user: User): void {
    this.userSubject.next(user);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.jsonServerUrl}/${id}`);
  }

  createUser(newUser: User): void {
    newUser.cep = this.formatCep(newUser.cep);
    newUser.cpf = this.formatCpf(newUser.cpf);

    this.httpClient.post<User>(this.jsonServerUrl, newUser).subscribe({
      next: () => {
        this.fetchUsers(); // Recarrega os usuários após criação
        console.log('Usuário registrado e lista de usuários atualizada');
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
      }
    });
  }

  formatCep(cep: string): string {
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  formatCpf(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  fetchUsers(): void {
    this.httpClient.get<User[]>("http://localhost:8080/users").subscribe({
      next: (users) => {
        this.usersSubject.next(users); // Atualiza o BehaviorSubject com os novos usuários
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  getUserByField(field: keyof User, value: string, users: User[]): User[] {
    if (!value || !field) return users;

    return users.filter(user => {
      const userField = user[field];
      return (
        userField &&
        userField.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  deleteUser(id: string): void {
    this.httpClient.delete<void>(`http://localhost:8080/users/${id}`).subscribe({
      next: () => {
        this.fetchUsers(); // Atualiza a lista após deletar
        console.log('Usuário deletado e lista de usuários atualizada');
      },
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
      }
    });
  }

  editUser(updatedUser: User, id: string): void {
    const editUserRequest: User = updatedUser;
    editUserRequest.id = id;
    this.httpClient.put<User>("http://localhost:8080/users", editUserRequest).subscribe({
      next: () => {
        this.fetchUsers();
        this.userSubject.next(null);
      },
      error: (err) => {
        console.error('Erro ao editar usuário:', err);
      }
    });
  }
}