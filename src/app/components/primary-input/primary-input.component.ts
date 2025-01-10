import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

type InputTypes = "text" | "email" | "date";

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './primary-input.component.html',
  styleUrls: ['./primary-input.component.scss']
})
export class PrimaryInputComponent implements OnInit {
  @Input() controlName: string = '';
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;

  ngOnInit(): void {
  }

  // Verifica o erro do campo e aplica classes de erro quando necessário
  getFieldError(): string | null {
    if (this.control && this.control.touched && this.control.invalid) {
      this.updateInputClasses(); // Adiciona classes de erro ao campo

      if (this.control.errors?.['required']) {
        return 'Este campo é obrigatório.';
      }
      if (this.control.errors?.['minlength']) {
        return `O campo precisa ter pelo menos ${this.control.errors['minlength'].requiredLength} caracteres.`;
      }
      if (this.control.errors?.['email']) {
        return 'Digite um e-mail válido.';
      }
      if (this.control.errors?.['pattern']) {
        return 'Formato incorreto inserido!';
      }
    } else {
      this.removeErrorClasses(); // Remove classes de erro caso o campo esteja válido
    }
    return null;
  }

  getErrorText(): string {
    return "errorText" + this.controlName;
  }

  // Adiciona classes de erro ao input quando necessário
  updateInputClasses(): void {
    const inputElement = document.getElementById(this.controlName);
    const errorTextElement = document.getElementById(this.getErrorText());
    inputElement?.classList.add('!border-red-500');
    errorTextElement?.classList.add('text-red-500');
  }

  // Remove classes de erro quando o campo está válido
  removeErrorClasses(): void {
    const inputElement = document.getElementById(this.controlName);
    inputElement?.classList.remove('!border-red-500', 'text-red-500');
  }
}