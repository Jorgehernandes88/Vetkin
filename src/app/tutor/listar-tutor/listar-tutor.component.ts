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
  resposta!: any;

  constructor(private tutorService: TutorService) { }


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
        next: (resposta) => {
          if(resposta){
            this.resposta = resposta
          }
        },
        error: (erro: Error) => this.mostrarMensagem(erro.message),
        complete: () => (this.mostrarMensagem(this.resposta['Status']),document.location.reload())
      });
    }
    document.location.reload()
  }

  confirmaRemoverCliente(tutor: Tutor){
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + tutor.nomeCompleto + "?");
    return confirmaRemocaoCliente;
  }

  mostrarMensagem(mensagem : string){
    alert(mensagem);
  }
}
