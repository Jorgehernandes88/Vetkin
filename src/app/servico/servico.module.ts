import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicoService } from './services/servico.service';
import { ListarServicoComponent } from './listar-servico/listar-servico.component';

@NgModule({
  declarations: [
    ListarServicoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers:[
    ServicoService
  ]
})
export class ServicoModule { }
