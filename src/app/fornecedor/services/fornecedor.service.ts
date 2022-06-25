import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from 'src/app/shared/models/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/Fornecedor/'

  //API Pacientes

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  listarFornecedores(): Observable<[]> {
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  inserirFornecedor(fornrcedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.post<Fornecedor>(this.BASE_URL, JSON.stringify(fornrcedor), this.httpOptions)
  }

  buscaPorIDFornecedor(id: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}${id}`, this.httpOptions)
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.put<Fornecedor>(this.BASE_URL + fornecedor.recID_Fornecedor, JSON.stringify(fornecedor), this.httpOptions);
  }

  removerFornecedor(id: number): Observable<Fornecedor> {
    return this.httpClient.delete<Fornecedor>(this.BASE_URL + id);
  }

}
