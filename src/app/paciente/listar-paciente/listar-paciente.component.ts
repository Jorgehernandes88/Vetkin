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
  resposta!: any;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    return this.pacienteService.listarPacientes().subscribe({
      next: (pacientes: Paciente[]) => {
        if (pacientes == null) {
          this.pacientes = [];
        }
        else {
          this.pacientes = pacientes;
        }
      }
    });
  }

  remover($event: any, paciente: Paciente) {
    $event.preventDefault();

    if (this.confirmaRemoverPaciente(paciente)) {
      this.pacienteService.removerPaciente(paciente.recID_Paciente!).subscribe({
      next: (resposta) => {
        if(resposta){
          this.resposta = resposta
        }
      },
      error: (erro: Error) => this.mostrarMensagem(erro.message),
      complete: () => (this.mostrarMensagem(this.resposta['Status']),document.location.reload())
      });
    }
  }

  confirmaRemoverPaciente(paciente: Paciente){
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + paciente.nome + "?");
    return confirmaRemocaoCliente;
  }

  mostrarMensagem(mensagem : string){
    alert(mensagem);
  }

}
