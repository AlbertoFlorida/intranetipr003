import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config'; // 👈 Importa aquí

export interface Usuario {
  usuario: string;
  email: string;
  roles: string[];
  password?: string;
  nuevaPassword?: string; // 👈 Para edición
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = API_ENDPOINTS.users; // 👈 Ya no repites string

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  deleteUsuario(usuario: string): Observable<void> {
    const url = `${this.apiUrl}/${usuario}`; // ✅ más limpio
    return this.http.delete<void>(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  updateUsuario(usuario: string, data: Partial<Usuario>): Observable<Usuario> {
    const url = `${this.apiUrl}/${usuario}`;
    return this.http.put<Usuario>(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  createUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, user, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}
