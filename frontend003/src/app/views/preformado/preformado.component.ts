import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service'; // ✅ nombre real del servicio
import { Preformado } from '../../models/preformado.interface';
import { API_ENDPOINTS } from '../../config/api.config';

@Component({
  selector: 'app-preformado',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './preformado.component.html',
  styleUrls: ['./preformado.component.css']
})
export class PreformadoComponent {
  planos: Preformado[] = [];
  planosRelacionados: { codDescr: string; descrip: string; pathFic: string }[] = [];

  inputValue = '';
  codToFilter = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {} // ✅ corregido el nombre

  loadPlanos(): void {
    this.errorMessage = '';
    this.codToFilter = this.extractCod(this.inputValue);
    this.planos = [];

    this.apiService.getByCod<Preformado>(API_ENDPOINTS.preformado, this.codToFilter).subscribe({
      next: (plano: Preformado) => {
        this.planos = [plano];
        this.inputValue = '';
        this.planosRelacionados = [];

        const lineas = plano.descrip.split('\n');
        for (const linea of lineas) {
          const [cod, descrip] = linea.split('\t');
          if (cod && descrip) {
            this.planosRelacionados.push({
              codDescr: cod.trim(),
              descrip: descrip.trim(),
              pathFic: '#'
            });
          }
        }
      },
      error: () => {
        this.errorMessage = `No se encontró ningún preformado para: ${this.codToFilter}`;
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
