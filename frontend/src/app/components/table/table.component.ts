import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  isModalOpen: boolean = false;
  searchValue: string = '';
  selectedField: keyof User = 'nome';
  userId: string = '';
  campos: (keyof User)[] = [
    'nome', 'cpf', 'nascimento', 'email', 'cep', 'estado', 'cidade', 'bairro', 'rua', 'numero', 'complemento'
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
      this.updateFilteredUsers();
    });
  }

  openDeleteModal(id: string) {
    this.userId = id;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Atualizando o método de busca para usar o FormControl diretamente
  search(searchInput: string): void {
    this.searchValue = searchInput.trim().toLowerCase();
    this.filteredUsers = this.userService.getUserByField(this.selectedField, this.searchValue, this.users);
    searchInput = '';
  }

  delete(id: string): void {
    this.userService.deleteUser(id);
    this.closeModal();
  }

  update(user: User): void {
    this.userService.emitUser(user);
  }

  onCampoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Fazendo o casting para HTMLSelectElement
    this.selectedField = selectElement.value as keyof User; // Atualiza o valor selecionado
  }

  private updateFilteredUsers(): void {
    if (this.searchValue) {
      this.filteredUsers = this.userService.getUserByField(this.selectedField, this.searchValue, this.users);
    } else {
      this.filteredUsers = this.users;
    }
  }
}