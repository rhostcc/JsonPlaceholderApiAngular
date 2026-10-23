import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { API_CONFIG } from '../core/config/api.config';

@Service()
export class UserService {
  private http = inject(HttpClient);
  private url = `${API_CONFIG.base_url}/users`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
