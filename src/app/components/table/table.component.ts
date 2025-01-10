import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isModalOpen: boolean = false;
  userId: string = '';

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

  search(searchField: HTMLInputElement): void {
    this.searchTerm = searchField.value.trim().toLowerCase();
    this.filteredUsers = this.userService.getUserByName(this.searchTerm, this.users);
    searchField.value = '';
  }

  delete(id: string): void {
    this.userService.deleteUser(id);
    this.closeModal();
  }

  update(id: string): void {
    this.userService.setUserId(id);
  }

  private updateFilteredUsers(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.userService.getUserByName(this.searchTerm, this.users);
    } else {
      this.filteredUsers = this.users;
    }
  }
}
