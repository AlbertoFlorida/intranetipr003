import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getByCod<T>(endpoint: string, cod: string): Observable<T> {
    return this.http.get<T>(`${endpoint}/${cod}`);
  }
}