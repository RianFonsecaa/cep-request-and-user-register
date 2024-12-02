import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jsonServerUrl: string = environment.jsonServerUrl;

  private usersSubject = new Subject<User[]>();
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.fetchUsers();
  }

  createUser(newUser: User) {

    newUser.cep = this.formatCep(newUser.cep);
    newUser.cpf = this.formatCpf(newUser.cpf);

    this.httpClient.post<User>('http://localhost:3000/users', newUser).subscribe({
      next: () => {
        this.fetchUsers();
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

  // Função para formatar o CPF (xxx.xxx.xxx-xx)
  formatCpf(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  fetchUsers(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: (users) => {
        this.usersSubject.next(users);
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }
}