import { Component, OnInit } from '@angular/core';

import { TutorService } from '../services/tutor.service';
import { Tutor } from '../../shared/models/tutor.model';

import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from 'src/app/paciente/services/paciente.service';

@Component({
  selector: 'app-listar-tutor',
  templateUrl: './listar-tutor.component.html',
  styleUrls: ['./listar-tutor.component.css']
})
export class ListarTutorComponent implements OnInit {

  tutores: Tutor[] = [];
  pacientes: Paciente[] = [];

  constructor(private tutorService: TutorService,private pacienteService: PacienteService) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    return this.tutorService.listarClientes().subscribe({
      next: (tutores: Tutor[]) => {
        if (tutores == null) {
          this.tutores = [];
        }
        else {
          this.tutores = tutores;
        }
      }
    });
  }

  remover($event: any, tutor: Tutor) {
    $event.preventDefault();

    if (this.confirmaRemoverCliente(tutor)) {
      this.tutorService.removerClientes(tutor.recID_TutorCliente!).subscribe({
        complete: () => document.location.reload()
      });
    }
    document.location.reload()
  }

  confirmaRemoverCliente(tutor: Tutor){
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + tutor.nomeCompleto + "?");
    return confirmaRemocaoCliente;
  }

/*
  remover($event: any, tutor: Tutor): void {
    $event.preventDefault();
    
    const pacientes =  this.pacienteService.listarTodosDoProprietario(tutor.recID_TutorCliente!);

    if (pacientes.length > 0)
    {
      confirm('Não é possivel remover esse usário. Existe "' + pacientes.length + '" registros associados.')
    }else{
      if (confirm('Deseja realmente remover esse "' + tutor.nomeCompleto + '"?')) {
        this.tutorService.remover(tutor.recID_TutorCliente!);
        //this.tutores = this.listarTodos();
      }
    }
    }
*/



}
