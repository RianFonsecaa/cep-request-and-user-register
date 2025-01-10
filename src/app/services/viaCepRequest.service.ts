import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ViaCepResponse } from '../models/ViaCepResponse';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class viaCepRequestService {
  viaCepUrl: string = environment.viaCepUrl;

  constructor(private httpClient: HttpClient) { }

  getAdressByCep(cep: string) {
    return this.httpClient.get<ViaCepResponse>(this.viaCepUrl + cep + "/json/");
  }
}
