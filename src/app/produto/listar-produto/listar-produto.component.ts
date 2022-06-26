import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FornecedorService } from 'src/app/fornecedor/services/fornecedor.service';
import { Fornecedor } from 'src/app/shared/models/fornecedor.model';
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
  fornecedor!: Fornecedor;
  fornecedores: Fornecedor[] = [];
  resposta!: any;
  public activeModal: NgbActiveModal | undefined;

  constructor(private produtoService: ProdutoService,private fornecedorService: FornecedorService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.produto = new Produto();
    this.listarTodos();
    this.listarTodosFornecedores();
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

  listarTodosFornecedores() {
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
    if (this.formProduto.form.valid) {
      this.produto.fornecedor = this.fornecedor;
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
      this.produtoService.atualizarProduto(this.produto).subscribe(
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
     let lucroLiquido = Number(produto.valorVenda) - Number(produto.valorCusto);
     lucroLiquido = (Number(lucroLiquido) / Number(produto.valorCusto)) * 100;
     produto.margemLucro = Number(lucroLiquido.toFixed(2));
    
     //comissaoSobreLucro
     let comissaoLucro =  (lucroLiquido * Number(produto.comissao)) / 100;
     produto.comissaoSobreLucro = Number(comissaoLucro.toFixed(2));
  }
}
