import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { viaCepResponse } from '../models/ViaCepResponse';

@Injectable({
  providedIn: 'root'
})
export class viaCepRequestService {
  viaCepUrl: string = environment.viaCepUrl;

  constructor(private httpRequest: HttpClient) { }

  getAdressByCep(cep: string){
    return this.httpRequest.get<viaCepResponse>(this.viaCepUrl + cep + "/json/")
  }
}
