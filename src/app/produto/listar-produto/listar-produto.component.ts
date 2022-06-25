import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/shared/models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {

  @ViewChild('formProduto') formProduto!: NgForm;

  produto!: Produto;
  produtos: Produto[] = [];
  resposta!: any;
  public activeModal: NgbActiveModal | undefined;

  constructor(private produtoService: ProdutoService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.produto = new Produto();
    this.listarTodos();
  }

  listarTodos() {
    return this.produtoService.listarProdutos().subscribe({
      next: (produtos: Produto[]) => {
        if (produtos == null) {
          this.produtos = [];
        }
        else {
          this.produtos = produtos;
        }
      }
    });
  }

  decisaoEvento($event: any) {
    if (this.formProduto.form.valid) {
      this.calcularMargem(this.produto);
      if (this.produto.recID_Produto?.toString() == "" || this.produto.recID_Produto?.toString() == null) {
        this.inserir($event);
      } else {
        this.atualizar($event);
      }
    }
  }

  inserir($event: any) {
    if (this.formProduto.form.valid) {
      this.produtoService.inserirProduto(this.produto).subscribe(
        {
          next: (resposta) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.produto = new Produto())
        });
    }
  }

  remover($event: any, produtos: Produto) {
    $event.preventDefault();

    if (this.confirmaRemoverPaciente(produtos)) {
      this.produtoService.removerExames(produtos.recID_Produto!).subscribe({
        next: (resposta: any) => {
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
    if (this.formProduto.form.valid) {
      this.produtoService.atualizarExames(this.produto).subscribe(
        {
          next: (resposta: any) => {
            if (resposta) {
              this.resposta = resposta
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resposta.Status), this.fecharModal(), this.listarTodos(), this.produto = new Produto())
        });
    }
  }

  preencherCamposProduto(template: TemplateRef<any>, produtos: Produto) {
    this.produto = produtos;
    this.abrirModal(template);
  }

  confirmaRemoverPaciente(produtos: Produto) {
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + produtos.nome + "?");
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

  calcularMargem(produto: Produto){
    
    //margemLucro
     let lucroLiquido = Number(produto.valorCusto) - Number(produto.valorVenda);
     produto.margemLucro = (Number(lucroLiquido) / Number(produto.valorCusto)) * 100;
    
     //comissaoSobreLucro
     produto.comissaoSobreLucro = (lucroLiquido * Number(produto.comissao)) / 100
  }
}
