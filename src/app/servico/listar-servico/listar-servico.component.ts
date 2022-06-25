import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Servico } from 'src/app/shared/models/servico.model';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-listar-servico',
  templateUrl: './listar-servico.component.html',
  styleUrls: ['./listar-servico.component.css']
})
export class ListarServicoComponent implements OnInit {

  @ViewChild('formServico') formServico!: NgForm;

  servico!: Servico;
  servicos: Servico[] = [];
  resposta!: any;
  public activeModal: NgbActiveModal | undefined;

  constructor(private servicoService: ServicoService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.servico = new Servico();
    this.listarTodos();
  }

  listarTodos() {
    return this.servicoService.listarServicos().subscribe({
      next: (servicos: Servico[]) => {
        if (servicos == null) {
          this.servicos = [];
        }
        else {
          this.servicos = servicos;
        }
      }
    });
  }

  decisaoEvento($event: any) {
    if (this.formServico.form.valid) {
      if (this.servico.recID_Servico?.toString() == "" || this.servico.recID_Servico?.toString() == null) {
        this.inserir($event);
      } else {
        this.atualizar($event);
      }
    }
  }

  inserir($event: any) {
    if (this.formServico.form.valid) {
      this.servicoService.inserirServico(this.servico).subscribe(
        {
          next: (resposta) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.servico = new Servico())
        });
    }
  }

  remover($event: any, servico: Servico) {
    $event.preventDefault();

    if (this.confirmaRemoverServico(servico)) {
      this.servicoService.removerServico(servico.recID_Servico!).subscribe({
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
    if (this.formServico.form.valid) {
      this.servicoService.atualizarServico(this.servico).subscribe(
        {
          next: (resposta) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.servico = new Servico())
        });
    }
  }

  preencherCamposServico(template: TemplateRef<any>, servico: Servico) {
    this.servico = servico;
    this.abrirModal(template);
  }

  confirmaRemoverServico(servico: Servico) {
    let confirmaRemocaoCliente = confirm("Deseja remover o Serviço " + servico.nome + "?");
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
