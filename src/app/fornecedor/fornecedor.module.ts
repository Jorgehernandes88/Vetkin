import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FornecedorService } from './services/fornecedor.service';
import { ListarFornecedorComponent } from './listar-fornecedor/listar-fornecedor.component';

@NgModule({
  declarations: [
    ListarFornecedorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers:[
    FornecedorService
  ]
})
export class FornecedorModule { }
