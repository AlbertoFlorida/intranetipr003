import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datamatrix42',
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, FormsModule], // Importa FormsModule aquí
  templateUrl: './datamatrix42.component.html',
  styleUrls: ['./datamatrix42.component.css']
})
export class Datamatrix42Component {
  inputValue: string = '';
  errorList: string[] = [
    "Enter only 4 letters A",
    "Enter only 8 numbers. Example: 00015678",
    "Enter only 6 numbers. Example: 000456",
    `Date format FDDMMYY Example: ${this.getCurrentDate()}`,
    "Enter only 7 digits. Example: 0095055, 095055B",
    "Enter only 10 numbers. Example: 0010210455 "
  ];

  constructor() {}

  getCurrentDate(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    return `F${day}${month}${year}`;
  }

  checkInput(): void {
    const input = this.inputValue;
    const labels = ['START', 'ORDER', 'COUNTER', 'DATE', 'CODE', 'SUPPLIER'];
    const values = [
      input.substring(0, 4),
      input.substring(4, 12),
      input.substring(12, 18),
      input.substring(18, 25),
      input.substring(25, 32),
      input.substring(32, 44)
    ];

    const errors = labels.map((label, index) => {
      const value = values[index];
      const regex = this.getValidationRegex(label);
      return regex.test(value) ? null : this.errorList[index];
    });

    this.updateTable(labels, values, errors);
  }

  updateTable(labels: string[], values: string[], errors: (string | null)[]): void {
    const table = document.querySelector('table');
    if (!table) return;

    table.innerHTML = '';

    const headerRow = table.insertRow();
    labels.forEach(label => {
      const headerCell = headerRow.insertCell();
      headerCell.innerHTML = label;
      headerCell.style.backgroundColor = '#015196';
      headerCell.style.color = 'white';
    });

    const valueRow = table.insertRow();
    values.forEach(value => {
      const valueCell = valueRow.insertCell();
      valueCell.innerHTML = value;
    });

    if (errors.some(error => error !== null)) {
      const errorRow = table.insertRow();
      errors.forEach(error => {
        const errorCell = errorRow.insertCell();
        errorCell.innerHTML = error || "OK";
        errorCell.style.backgroundColor = error ? 'red' : 'green';
      });
      table.style.backgroundColor = 'red';

      const totalCharacterCode = values.join("").length;
      if (totalCharacterCode !== 42) {
        const totalDigitSumCell = table.insertRow().insertCell();
        totalDigitSumCell.colSpan = labels.length;
        totalDigitSumCell.innerHTML = `Wrong length: ${totalCharacterCode}`;
      }
    } else {
      table.style.backgroundColor = 'green';
    }
  }

  getValidationRegex(label: string): RegExp {
    switch (label) {
      case 'START':
        return /^A{4}$/;
      case 'ORDER':
        return /^\d{8}$/;
      case 'COUNTER':
        return /^\d{6}$/;
      case 'DATE':
        return /^F(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}$/;
      case 'CODE':
        return /^\d{6}[0-9A-Z]$/;
      case 'SUPPLIER':
        return /^\d{10}$/;
      default:
        return /.*/;
    }
  }
}