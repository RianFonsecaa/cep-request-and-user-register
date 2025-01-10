import { Component } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { viaCepRequestService } from '../../services/viaCepRequest.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimaryInputComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  registerForm: FormGroup;

  constructor(private viaCepRequest: viaCepRequestService) {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)
      ]),
      dataNascimento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cep: new FormControl('', [
        Validators.required,
        Validators.pattern(/\d{5}-\d{3}/)
      ]),
      estado: new FormControl({ value: '', disabled: true }, Validators.required),
      cidade: new FormControl({ value: '', disabled: true }, Validators.required),
      bairro: new FormControl({ value: '', disabled: true }, Validators.required),
      rua: new FormControl({ value: '', disabled: true }, Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl('')
    });
  }
  
  ngOnInit(): void{
    this.observerCepField();
  }

  observerCepField(){
    this.registerForm.get('cep')?.valueChanges.subscribe(value => {
      if (this.getControl('cep').valid){
        this.getAdress();
      }
    })
  }

  getAdress() {
    const cep = this.registerForm.get('cep')?.value;
    this.viaCepRequest.getAdressByCep(cep).subscribe({
      next: (response) => {
        this.registerForm.patchValue({
          estado: response.estado,
          cidade: response.localidade,
          bairro: response.bairro,
          rua: response.logradouro,
        });
  
        if (response.estado === '') {
          this.registerForm.get('estado')?.enable();
        } else {
          this.registerForm.get('estado')?.disable();
        }
  
        if (response.localidade === '') {
          this.registerForm.get('cidade')?.enable();
        } else {
          this.registerForm.get('cidade')?.disable();
        }
  
        if (response.bairro === '') {
          this.registerForm.get('bairro')?.enable();
        } else {
          this.registerForm.get('bairro')?.disable();
        }
  
        if (response.logradouro === '') {
          this.registerForm.get('rua')?.enable();
        } else {
          this.registerForm.get('rua')?.disable();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar endereço:', err);
      }
    });
  }

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  getErrorText(name: string): string {
    return 'errorText' + name;
  }
}