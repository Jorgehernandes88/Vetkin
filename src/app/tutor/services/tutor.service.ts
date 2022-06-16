import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Tutor } from 'src/app/shared/models/tutor.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

const LS_CHAVE: string = "tutores";

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/TutorClientes/'
  BASE_URL_CEP = "https://viacep.com.br/ws/"


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

listarClientes(): Observable<[]> {
  return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
}

  inserirClientes(tutor: Tutor): Observable<Tutor>{
    return this.httpClient.post<Tutor>(this.BASE_URL, JSON.stringify(tutor), this.httpOptions)
}

buscaPorIDCliente(id: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}${id}`, this.httpOptions)
}

buscaPorCpf(cpf: string): Observable<[]> {
  return this.httpClient.get<[]>(`${this.BASE_URL}cpf/${cpf}`, this.httpOptions);
}

atualizarClientes(tutor: Tutor): Observable<Tutor> {
  return this.httpClient.put<Tutor>(this.BASE_URL + tutor.recID_TutorCliente, JSON.stringify(tutor), this.httpOptions);
}

removerClientes(id: number): Observable<Tutor> {
  return this.httpClient.delete<Tutor>(this.BASE_URL + id);
}

buscarCEP(cep: string): Observable<[]> {
  return this.httpClient.get<[]>(`${this.BASE_URL_CEP}${cep}/json`, this.httpOptions);
}

}
