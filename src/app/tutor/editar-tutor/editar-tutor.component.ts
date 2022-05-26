import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutor } from 'src/app/shared/models/tutor.model';
import { TutorService } from '../services/tutor.service';

import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from 'src/app/paciente/services/paciente.service';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.css']
})
export class EditarTutorComponent implements OnInit {

  @ViewChild('formTutor') formTutor!: NgForm;
  @ViewChild('formPaciente') formPaciente!: NgForm;

  tutor!: Tutor;
  paciente!: Paciente;
  res!: any;
  
  public idTutor?: number = +this.route.snapshot.params['id'];
  displayStyle = "none";

  pacientes: Paciente[] = [];


  constructor(private tutorService: TutorService, private router: Router, private route: ActivatedRoute, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
    this.pacientes = this.listarTodosDoTutorAtual();
    this.preencherCamposTutor(+this.route.snapshot.params['id']);
  }

  preencherCamposTutor(id: number){
    this.tutorService.buscaPorIDCliente(id.toString()).subscribe(
      {
        next: (res) => {
          if(res){
            this.res = res
          }
        },
        complete: () => (this.tutor = this.res)
      }
    )
  }

  atualizar(): void {
    if (this.formTutor.form.valid) {
      this.tutorService.atualizarClientes(this.tutor).subscribe(
        {
        next: (res) => {
            if(res){
              this.res = res
            }
         },
        error: (erro: Error) => this.mostrarMensagem(erro.message),
        complete: () => (this.mostrarMensagem(this.res.Status),this.router.navigate(['/tutores/listar']))
      });
    }
  }

  inserirPaciente(): void {
    if (this.formPaciente.form.valid) {
      this.paciente.IDproprietario = this.idTutor;
      this.pacienteService.inserir(this.paciente);
      this.closePopup();
      document.location.reload();
    }
  }

  listarTodosDoTutorAtual(): Paciente[] {
    return this.pacienteService.listarTodosDoProprietario(this.idTutor!);
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  mostrarMensagem(mensagem : string){
    alert(mensagem);
  }

}
