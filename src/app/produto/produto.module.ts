import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from './services/produto.service';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';

@NgModule({
  declarations: [
    ListarProdutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers:[
    ProdutoService
  ]
})
export class ProdutoModule { }
