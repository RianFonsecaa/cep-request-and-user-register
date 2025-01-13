import { UserService } from '../../services/user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { viaCepRequestService } from '../../services/viaCepRequest.service';
import { NgClass, NgFor } from '@angular/common';
import { TableComponent } from "../../components/table/table.component";
import { User } from '../../models/User';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PrimaryInputComponent, ReactiveFormsModule, NgFor, NgClass, TableComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  registerForm: FormGroup;
  user?: User;

  constructor(
    private viaCepRequest: viaCepRequestService, private userService: UserService
  ) {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}(\.\d{3}){2}-\d{2}$|^\d{11}$/)
      ]),
      nascimento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cep: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5}-?\d{3}$/)
      ]),
      estado: new FormControl({ value: '', disabled: true }, Validators.required),
      cidade: new FormControl({ value: '', disabled: true }, Validators.required),
      bairro: new FormControl({ value: '', disabled: true }, Validators.required),
      rua: new FormControl({ value: '', disabled: true }, Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.loadUserData();
      } else {
        this.user = undefined;
      }
    });
  }

  loadUserData(): void {
    if (this.user) {
      // Verifica se a propriedade existe antes de usá-la
      this.toggleFieldState('estado', this.user.estado);
      this.toggleFieldState('cidade', this.user.cidade);
      this.toggleFieldState('bairro', this.user.bairro);
      this.toggleFieldState('rua', this.user.rua);
      this.registerForm.patchValue(this.user);
    }
  }

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  getAdress() {
    const cep = this.registerForm.get('cep')?.value;
    this.viaCepRequest.getAdressByCep(cep).subscribe({
      next: (response) => {
        if (response.erro) {
          this.registerForm.get('cep')?.setErrors({ invalidCep: true });
        } else {
          this.registerForm.patchValue({
            estado: response.estado,
            cidade: response.localidade,
            bairro: response.bairro,
            rua: response.logradouro,
          });

          this.toggleFieldState('estado', response.estado);
          this.toggleFieldState('cidade', response.localidade);
          this.toggleFieldState('bairro', response.bairro);
          this.toggleFieldState('rua', response.logradouro);
        }
      },
    });
  }

  toggleFieldState(field: string, value: string) {
    if (value === '') {
      this.registerForm.get(field)?.enable();
    } else {
      this.registerForm.get(field)?.disable();
    }
  }

  submit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.getRawValue();
      if (this.user) {
        this.userService.editUser(userData, this.user.id);
      } else {
        this.userService.createUser(userData);
      }
      this.registerForm.reset();
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
