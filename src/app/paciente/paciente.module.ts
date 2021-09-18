import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PacienteService } from './services/paciente.service';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { InserirPacienteComponent } from './inserir-paciente/inserir-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';

@NgModule({
  declarations: [
    ListarPacienteComponent,
    InserirPacienteComponent,
    EditarPacienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    PacienteService
  ]
})
export class PacienteModule { }
