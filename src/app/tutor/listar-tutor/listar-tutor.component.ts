import { Component, OnInit } from '@angular/core';

import { TutorService } from '../services/tutor.service';
import { Tutor } from '../../shared/models/tutor.model';

@Component({
  selector: 'app-listar-tutor',
  templateUrl: './listar-tutor.component.html',
  styleUrls: ['./listar-tutor.component.css']
})
export class ListarTutorComponent implements OnInit {

  tutores: Tutor[] = [];

  constructor(private tutorService: TutorService) { }

    ngOnInit(): void {
    this.tutores = this.listarTodos();
  }

  listarTodos(): Tutor[]{
    return this.tutorService.listarTodos();


  }

  remover($event: any, tutor: Tutor): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover esse "' + tutor.nome + '"?')) {
      this.tutorService.remover(tutor.id!);
      this.tutores = this.listarTodos();
    }
  }


}
