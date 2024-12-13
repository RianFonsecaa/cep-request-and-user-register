import { UserService } from '../../services/user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { viaCepRequestService } from '../../services/viaCepRequest.service';
import { NgClass, NgFor } from '@angular/common';
import { TableComponent } from "../../components/table/table.component";
import { User } from '../../models/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimaryInputComponent, ReactiveFormsModule, NgFor, NgClass, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  registerForm: FormGroup;
  userId: string = '';

  constructor(
    private viaCepRequest: viaCepRequestService, private userService: UserService
  ) {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}(\.\d{3}){2}-\d{2}$|^\d{11}$/)
      ]),
      dataNascimento: new FormControl('', Validators.required),
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
    this.userService.userId$.subscribe((id: string | null) => {
      if (id) {
        this.userId = id;
        this.loadUserData();
      }
    });
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.toggleFieldState('estado', user.estado);
      this.toggleFieldState('cidade', user.cidade);
      this.toggleFieldState('bairro', user.bairro);
      this.toggleFieldState('rua', user.rua);
      this.registerForm.patchValue(user);
    });
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
      if (this.userId) {
        this.userService.editUser(userData, this.userId);
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