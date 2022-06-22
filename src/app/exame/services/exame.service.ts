import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exame } from 'src/app/shared/models/exame.model';

@Injectable({
  providedIn: 'root'
})
export class ExameService {

  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/Exames/'

  //API Pacientes

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  listarExames(): Observable<[]> {
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  inserirExames(exame: Exame): Observable<Exame> {
    return this.httpClient.post<Exame>(this.BASE_URL, JSON.stringify(exame), this.httpOptions)
  }

  buscaPorIDExames(id: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}${id}`, this.httpOptions)
  }

  atualizarExames(exame: Exame): Observable<Exame> {
    return this.httpClient.put<Exame>(this.BASE_URL + exame.recID_Exame, JSON.stringify(exame), this.httpOptions);
  }

  removerExames(id: number): Observable<Exame> {
    return this.httpClient.delete<Exame>(this.BASE_URL + id);
  }
}
