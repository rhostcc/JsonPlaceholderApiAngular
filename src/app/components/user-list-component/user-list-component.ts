import { Component, inject, OnInit, signal } from '@angular/core';
import { UserItemComponent } from '../user-item-component/user-item-component';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  imports: [UserItemComponent],
  selector: 'app-user-list-component',
  styleUrl: './user-list-component.css',
  templateUrl: './user-list-component.html',
})
export class UserListComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }
  private readonly userService = inject(UserService);

  readonly users = signal<User[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  getError(error: HttpErrorResponse): string {
    if (error.status === 0) return 'El servidor no esta disponible.';
    return `Falló la solicitud http: ${error.status}`;
  }
  getUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService
      .getUsers()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (users) => {
          this.users.set(users);
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(this.getError(err));
        },
      });
  }
}
