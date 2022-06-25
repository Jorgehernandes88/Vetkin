import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from 'src/app/shared/models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/Servicos/'

  //API Pacientes

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  listarServicos(): Observable<[]> {
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  inserirServico(servico: Servico): Observable<Servico> {
    return this.httpClient.post<Servico>(this.BASE_URL, JSON.stringify(servico), this.httpOptions)
  }

  buscaPorIDServico(id: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}${id}`, this.httpOptions)
  }

  atualizarServico(servico: Servico): Observable<Servico> {
    return this.httpClient.put<Servico>(this.BASE_URL + servico.recID_Servico, JSON.stringify(servico), this.httpOptions);
  }

  removerServico(id: number): Observable<Servico> {
    return this.httpClient.delete<Servico>(this.BASE_URL + id);
  }
  
}
