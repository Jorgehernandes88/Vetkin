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
    this.tutores = this.listarTodos();
  }

  listarTodos(): Tutor[]{
    return this.tutorService.listarTodos();


  }


  remover($event: any, tutor: Tutor): void {
    $event.preventDefault();
    
    const pacientes =  this.pacienteService.listarTodosDoProprietario(tutor.id!);

    if (pacientes.length > 0)
    {
      confirm('Não é possivel remover esse usário. Existe "' + pacientes.length + '" registros associados.')
    }else{
      if (confirm('Deseja realmente remover esse "' + tutor.nome + '"?')) {
        this.tutorService.remover(tutor.id!);
        this.tutores = this.listarTodos();
      }
    }
    }




}
