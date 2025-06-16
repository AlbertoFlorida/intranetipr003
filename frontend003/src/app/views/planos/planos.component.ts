import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { Planos } from '../../models/planos.interface';
import { API_ENDPOINTS } from '../../config/api.config';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent {
  planos: Planos[] = [];
  planosRelacionados: { codDescr: string; descrip: string; pathFic: string }[] = [];

  inputValue = '';
  codToFilter = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  loadPlanos(): void {
    this.errorMessage = '';
    this.codToFilter = this.extractCod(this.inputValue);
    this.planos = [];

    this.apiService.getByCod<Planos>(API_ENDPOINTS.planos, this.codToFilter).subscribe({
      next: (plano) => {
        this.planos = [plano];
        this.inputValue = '';
        this.planosRelacionados = [];

        for (let i = 1; i <= 5; i++) {
          const cod = plano[`codDescr${i}` as keyof Planos];
          const descrip = plano[`descrip${i}` as keyof Planos];
          const path = plano[`pathFic${i}` as keyof Planos];

          if (cod) {
            this.planosRelacionados.push({
              codDescr: cod as string,
              descrip: descrip as string || '',
              pathFic: path as string || '#',
            });
          }
        }
      },
      error: () => {
        this.errorMessage = `No se encontró ningún plano asignado para: ${this.codToFilter}`;
        this.inputValue = '';
        this.planosRelacionados = [];
      }
    });
  }

  extractCod(input: string): string {
    return input.length >= 20
      ? input.substring(19).toUpperCase()
      : input.toUpperCase();
  }
}
