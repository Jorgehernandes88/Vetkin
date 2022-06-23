import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExameService } from '../services/exame.service';
import { Exame } from 'src/app/shared/models/exame.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-exame',
  templateUrl: './listar-exame.component.html',
  styleUrls: ['./listar-exame.component.css']
})
export class ListarExameComponent implements OnInit {

  @ViewChild('formExame') formExame!: NgForm;

  exame!: Exame;
  exames: Exame[] = [];
  resposta!: any;
  public activeModal: NgbActiveModal | undefined;

  constructor(private exameService: ExameService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.exame = new Exame();
    this.listarTodos();
  }

  listarTodos() {
    return this.exameService.listarExames().subscribe({
      next: (exames: Exame[]) => {
        if (exames == null) {
          this.exames = [];
        }
        else {
          this.exames = exames;
        }
      }
    });
  }

  decisaoEvento($event: any) {
    if (this.formExame.form.valid) {
      if (this.exame.recID_Exame?.toString() == "" || this.exame.recID_Exame?.toString() == null) {
        this.inserir($event);
      } else {
        this.atualizar($event);
      }
    }
  }

  inserir($event: any) {
    if (this.formExame.form.valid) {
      this.exameService.inserirExames(this.exame).subscribe(
        {
          next: (resposta) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.exame = new Exame())
        });
    }
  }

  remover($event: any, exames: Exame) {
    $event.preventDefault();

    if (this.confirmaRemoverPaciente(exames)) {
      this.exameService.removerExames(exames.recID_Exame!).subscribe({
        next: (resposta) => {
          if (resposta) {
            this.resposta = resposta
          }
        },
        error: (erro: Error) => this.mostrarMensagem(erro.message),
        complete: () => (this.mostrarMensagem(this.resposta['Status']), document.location.reload())
      });
    }
  }

  atualizar($event: any) {
    if (this.formExame.form.valid) {
      this.exameService.atualizarExames(this.exame).subscribe(
        {
          next: (resposta) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.exame = new Exame())
        });
    }
  }

  preencherCamposExame(template: TemplateRef<any>, exames: Exame) {
    this.exame = exames;
    this.abrirModal(template);
  }

  confirmaRemoverPaciente(exames: Exame) {
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + exames.nome + "?");
    return confirmaRemocaoCliente;
  }

  mostrarMensagem(mensagem: string) {
    alert(mensagem);
  }

  abrirModal(template: TemplateRef<any>) {
    const modalRef = this.modalService.open(template);
  }

  fecharModal() {
    const modalRef = this.modalService.dismissAll();
  }

}
