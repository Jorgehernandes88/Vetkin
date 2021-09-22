import { Injectable } from '@angular/core';

import { Paciente } from 'src/app/shared/models/paciente.model';

const LS_CHAVE: string = "pacientes";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() { }

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

    paciente.id = new Date().getTime();

    pacientes.push(paciente);

    localStorage[LS_CHAVE] = JSON.stringify(pacientes);
  }

  buscarPorId(id: number): Paciente | undefined {
    const pacientes: Paciente[] = this.listarTodos();

    return pacientes.find(paciente => paciente!.id === id);
  }

  atualizar(paciente: Paciente): void {
    const pacientes: Paciente[] = this.listarTodos();

    pacientes.forEach((obj, index, objs) => {
      if (paciente.id === obj.id) {
        objs[index] = paciente
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(pacientes);

  }

  remover(id: number): void {

    let pacientes: Paciente[] = this.listarTodos();

    pacientes = pacientes.filter(paciente => paciente.id !== id);

    //atualiza a lista de pessoas
    localStorage[LS_CHAVE] = JSON.stringify(pacientes);
  }


}
