import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/Produto/'

  //API Pacientes

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  listarProdutos(): Observable<[]> {
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  inserirProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.BASE_URL, JSON.stringify(produto), this.httpOptions)
  }

  buscaPorIDProduto(id: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}${id}`, this.httpOptions)
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(this.BASE_URL + produto.recID_Produto, JSON.stringify(produto), this.httpOptions);
  }

  removerProduto(id: number): Observable<Produto> {
    return this.httpClient.delete<Produto>(this.BASE_URL + id);
  }
}
