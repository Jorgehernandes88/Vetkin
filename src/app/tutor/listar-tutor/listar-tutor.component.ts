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

  /*  return[
      new Tutor(1,"Paloma Bittar","Palomabittar@hotmail.com","Veterinaria","071.760.649-03","(41)9 88932447",true,"82.630-000",
      "Travessa Shultz,288","Bloco 2, AP 831","Muito Chato","N/A","Ativo")
    ];*/
  }

  remover($event: any, tutor: Tutor): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover esse "' + tutor.nome + '"?')) {
      this.tutorService.remover(tutor.id!);
      this.tutores = this.listarTodos();
    }
  }


}
