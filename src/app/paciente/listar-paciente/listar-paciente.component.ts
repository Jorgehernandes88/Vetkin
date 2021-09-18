import { Component, OnInit } from '@angular/core';

import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../../shared/models/paciente.model';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {

  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacientes = this.listarTodos();
  }

  listarTodos(): Paciente[] {
    return this.pacienteService.listarTodos();

    /*return [
      new Paciente(1,"Molly","ASPONE","14",true,"n/a")
    ];*/

  }

  remover($event: any, paciente: Paciente): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover esse "' + paciente.nome + '"?')) {
      this.pacienteService.remover(paciente.id!);
      this.pacientes = this.listarTodos();
    }
  }

}
