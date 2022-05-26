import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TutorService } from './services/tutor.service';
import { ListarTutorComponent } from './listar-tutor/listar-tutor.component';
import { InserirTutorComponent } from './inserir-tutor/inserir-tutor.component';
import { EditarTutorComponent } from './editar-tutor/editar-tutor.component';


@NgModule({
  declarations: [
    ListarTutorComponent,
    InserirTutorComponent,
    EditarTutorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    TutorService
  ]
})
export class TutorModule { }
