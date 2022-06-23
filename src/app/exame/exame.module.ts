import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExameService } from './services/exame.service';
import { ListarExameComponent } from './listar-exame/listar-exame.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarExameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers:[
    ExameService
  ]
})
export class ExameModule { }
