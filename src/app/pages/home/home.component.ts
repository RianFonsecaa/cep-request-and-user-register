import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';
import { User } from '../../models/User';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { viaCepRequestService } from '../../services/viaCepRequest.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimaryInputComponent, ReactiveFormsModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  registerForm: FormGroup;
  users: User[] = [];

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
    this.observerCepField();
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });
  }

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  observerCepField() {
    this.registerForm.get('cep')?.valueChanges.subscribe(value => {
      if (this.getControl('cep').valid) {
        this.getAdress();
      }
    });
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
      const newUser = this.registerForm.getRawValue() as User;
      this.userService.createUser(newUser);
      this.registerForm.reset();
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}