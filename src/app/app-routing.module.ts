import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarPacienteComponent } from './paciente/listar-paciente/listar-paciente.component';
import { InserirPacienteComponent } from './paciente/inserir-paciente/inserir-paciente.component';
import { EditarPacienteComponent } from './paciente/editar-paciente/editar-paciente.component';

import { ListarTutorComponent } from './tutor/listar-tutor/listar-tutor.component';
import { InserirTutorComponent } from './tutor/inserir-tutor/inserir-tutor.component';
import { EditarTutorComponent } from './tutor/editar-tutor/editar-tutor.component';

import { ListarExameComponent } from './exame/listar-exame/listar-exame.component';

import { ListarServicoComponent } from './servico/listar-servico/listar-servico.component';

const routes: Routes = [
    //Tutores
    {
        path: 'tutores',
        redirectTo: 'tutores/listar'
    },
    {
        path: 'tutores/listar',
        component: ListarTutorComponent
    },
    {
        path: 'tutores/novo',
        component: InserirTutorComponent
    },
    {
        path: 'tutores/editar/:id',
        component: EditarTutorComponent
    },
    //Pacientes
    {
        path: 'pacientes',
        redirectTo: 'pacientes/listar'
    },
    {
        path: 'pacientes/listar',
        component: ListarPacienteComponent
    },
    {
        path: 'pacientes/novo',
        component: InserirPacienteComponent
    },
    {
        path: 'pacientes/editar/:id',
        component: EditarPacienteComponent
    },
    //Exames
    {
        path: 'exames',
        redirectTo: 'exames/listar'
    },
    {
        path: 'exames/listar',
        component: ListarExameComponent
    },
    //Servico
    {
        path: 'servicos',
        redirectTo: 'servicos/listar'
    },
    {
        path: 'servicos/listar',
        component: ListarServicoComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }