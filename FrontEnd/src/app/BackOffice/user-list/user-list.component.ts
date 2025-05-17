import { Component } from '@angular/core';
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Role} from "../../models/Role";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  loading: boolean = false;
  searchQuery: string = ''; // New property for search input
  errorMessage: string = '';
  editMode: boolean = false;
  addMode: boolean = false;
  selectedUser: User | null = null;
  roles = Object.values(Role);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading = false;
      }
    });
  }
  searchUsers(): void {
    if (this.searchQuery.trim()) {
      this.userService.advancedSearchUsers(this.searchQuery).subscribe({
        next: (data) => {
          this.users = data;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to search users: ' + err.message;
          console.error('Error searching users:', err);
        }
      });
    } else {
      this.loadUsers(); // Reload all users if search is empty
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }

  saveUser(): void {
    if (!this.selectedUser) return;

    if (this.editMode) {
      this.userService.updateUser(this.selectedUser.userId!, this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelOperation();
        },
        error: (err) => {
          this.errorMessage = 'Failed to update user: ' + err.message;
          console.error('Error updating user:', err);
        }
      });
    } else if (this.addMode) {
      this.userService.addUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelOperation();
        },
        error: (err) => {
          this.errorMessage = 'Failed to add user: ' + err.message;
          console.error('Error adding user:', err);
        }
      });
    }
  }

  cancelOperation(): void {
    this.editMode = false;
    this.addMode = false;
    this.selectedUser = null;
  }
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.selectedUser?.email ? emailRegex.test(this.selectedUser.email) : false;
  }
  openEditModal(user: User): void {
    this.selectedUser = { ...user }; // Create a copy to avoid direct modification
    this.editMode = true;
  }


}

