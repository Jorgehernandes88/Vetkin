import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fornecedor } from 'src/app/shared/models/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-listar-fornecedor',
  templateUrl: './listar-fornecedor.component.html',
  styleUrls: ['./listar-fornecedor.component.css']
})
export class ListarFornecedorComponent implements OnInit {

  @ViewChild('formFornecedor') formFornecedor!: NgForm;

  fornecedor!: Fornecedor;
  fornecedores: Fornecedor[] = [];
  resposta!: any;
  public activeModal: NgbActiveModal | undefined;

  constructor(private fornecedorService: FornecedorService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fornecedor = new Fornecedor();
    this.listarTodos();
  }

  listarTodos() {
    return this.fornecedorService.listarFornecedores().subscribe({
      next: (fornecedores: Fornecedor[]) => {
        if (fornecedores == null) {
          this.fornecedores = [];
        }
        else {
          this.fornecedores = fornecedores;
        }
      }
    });
  }

  decisaoEvento($event: any) {
    if (this.formFornecedor.form.valid) {
      if (this.fornecedor.recID_Fornecedor?.toString() == "" || this.fornecedor.recID_Fornecedor?.toString() == null) {
        this.inserir($event);
      } else {
        this.atualizar($event);
      }
    }
  }

  inserir($event: any) {
    if (this.formFornecedor.form.valid) {
      this.fornecedorService.inserirFornecedor(this.fornecedor).subscribe(
        {
          next: (resposta: any) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.fornecedor = new Fornecedor())
        });
    }
  }

  remover($event: any, fornecedor: Fornecedor) {
    $event.preventDefault();

    if (this.confirmaRemoverPaciente(fornecedor)) {
      this.fornecedorService.removerFornecedor(fornecedor.recID_Fornecedor!).subscribe({
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
    if (this.formFornecedor.form.valid) {
      this.fornecedorService.atualizarFornecedor(this.fornecedor).subscribe(
        {
          next: (resposta) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.fornecedor = new Fornecedor())
        });
    }
  }

  preencherCamposFornecedor(template: TemplateRef<any>, fornecedor: Fornecedor) {
    this.fornecedor = fornecedor;
    this.abrirModal(template);
  }

  confirmaRemoverPaciente(fornecedor: Fornecedor) {
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + fornecedor.empresa + "?");
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
