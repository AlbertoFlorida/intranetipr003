import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-digitocontrol',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
  templateUrl: './digitocontrol.component.html',
  styleUrls: ['./digitocontrol.component.css']
})
export class DigitocontrolComponent {
  eanInput: string = ''; // Almacena el valor del input
  resultado: string = ''; // Almacena el resultado del cálculo
  referencia: string = ''; // Almacena la referencia completa

  constructor() {}

  // Función para calcular el dígito de control al presionar "Enter"
  calculateCheckDigitOnEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.calculateCheckDigit();
    }
  }

  // Función principal para calcular el dígito de control
  calculateCheckDigit(): void {
    const ref = this.eanInput;
    const refOnlyLetters = this.removeNumbers(ref);
    let refOnlyNumbers = this.removeLettersFromLeft(ref);

    if (refOnlyNumbers.length < 5) {
      refOnlyNumbers = "0" + refOnlyNumbers;
    }

    const input = "8424299" + refOnlyNumbers;

    if (input.length === 12 && /^\d+$/.test(input)) {
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        const factor = (i % 2 === 0) ? 1 : 3;
        sum += parseInt(input.charAt(i)) * factor;
      }
      const checksum = (10 - (sum % 10)) % 10;

      this.referencia = `"${this.removeLeadingZeros(refOnlyLetters + refOnlyNumbers)}"`;
      this.resultado = input + checksum;
      this.eanInput = ""; // Limpia el input
    } else {
      this.resultado = "Introduzca una referencia válida";
      this.referencia = "";
    }
  }

  // Función para eliminar letras y dejar solo números desde la izquierda
  removeLettersFromLeft(reference: string): string {
    let onlyNumbers = "";
    let foundNumber = false;

    for (let i = 0; i < reference.length; i++) {
      if (!isNaN(Number(reference[i]))) {
        foundNumber = true;
      }
      if (foundNumber) {
        onlyNumbers += reference[i];
      }
    }
    return onlyNumbers;
  }

  // Función para eliminar números de una cadena
  removeNumbers(inputString: string): string {
    return inputString.replace(/\d/g, '').toUpperCase();
  }

  // Función para eliminar ceros a la izquierda
  removeLeadingZeros(inputString: string): string {
    return inputString.replace(/^0+/, '');
  }
}