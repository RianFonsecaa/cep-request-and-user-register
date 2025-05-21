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
  searchValue: FormControl = new FormControl('');
  selectedField: keyof User = 'nome';
  userId: string = '';
  campos: (keyof User)[] = [
    'nome', 'cpf', 'nascimento', 'email', 'cep', 'estado', 'cidade', 'bairro', 'rua', 'numero', 'complemento'
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.searchValue.valueChanges.subscribe(value => {
      if (this.users.length) {
        this.filteredUsers = this.userService.getUserByField(this.selectedField, value, this.users);
      }
    });

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

  delete(id: string): void {
    this.userService.deleteUser(id);
    this.closeModal();
  }

  update(user: User): void {
    this.userService.emitUser(user);
  }

  onCampoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedField = selectElement.value as keyof User;
    this.updateFilteredUsers();
  }

  private updateFilteredUsers(): void {
    if (this.searchValue.value) {
      this.filteredUsers = this.userService.getUserByField(this.selectedField, this.searchValue.value, this.users);
    } else {
      this.filteredUsers = this.users;
    }
  }
}