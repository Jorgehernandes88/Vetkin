import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Paciente } from 'src/app/shared/models/paciente.model';

const LS_CHAVE: string = "pacientes";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/Paciente/'

  //API Pacientes

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  listarPacientes(): Observable<[]> {
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  inserirPaciente(paciente: Paciente): Observable<Paciente> {
    return this.httpClient.post<Paciente>(this.BASE_URL, JSON.stringify(paciente), this.httpOptions)
  }

  buscaPorIDPaciente(id: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}${id}`, this.httpOptions)
  }

  atualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.httpClient.put<Paciente>(this.BASE_URL + paciente.recID_Paciente, JSON.stringify(paciente), this.httpOptions);
  }

  removerPaciente(id: number): Observable<Paciente> {
    return this.httpClient.delete<Paciente>(this.BASE_URL + id);
  }

  //---------------------------------------------------------------------------------------------------------------------

  listarTodos(): Paciente[] {
    const pacientes = localStorage[LS_CHAVE];
    return pacientes ? JSON.parse(pacientes) : [];
  }

  listarTodosDoProprietario(idPropri: number): Paciente[] {
    const pacientes = localStorage[LS_CHAVE];


    return pacientes ? JSON.parse(pacientes).filter((paciente: { IDproprietario: number; }) => paciente.IDproprietario === idPropri) : [];
  }

  inserir(paciente: Paciente): void {
    //Obtem a lista completa de pessoas
    const pacientes = this.listarTodos();

    paciente.recID_Paciente = new Date().getTime();

    pacientes.push(paciente);

    localStorage[LS_CHAVE] = JSON.stringify(pacientes);
  }

  buscarPorId(id: number): Paciente | undefined {
    const pacientes: Paciente[] = this.listarTodos();

    return pacientes.find(paciente => paciente!.recID_Paciente === id);
  }

  atualizar(paciente: Paciente): void {
    const pacientes: Paciente[] = this.listarTodos();

    pacientes.forEach((obj, index, objs) => {
      if (paciente.recID_Paciente === obj.recID_Paciente) {
        objs[index] = paciente
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(pacientes);

  }
}
