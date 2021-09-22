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

  public idTutor?: number = +this.route.snapshot.params['id'];
  displayStyle = "none";

  pacientes: Paciente[] = [];


  constructor(private tutorService: TutorService, private router: Router, private route: ActivatedRoute, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
    this.pacientes = this.listarTodosDoTutorAtual();

    // snapshot.params de ActivatedRoute dá acesso aos parâmetros passados
    // Operador + (antes do this) converte para número
    let id = +this.route.snapshot.params['id'];
    // Com o id, obtém a pessoa
    const res = this.tutorService.buscarPorId(id);
    if (res !== undefined)
      this.tutor = res;
    else
      throw new Error("Tutor não encontrada: id = " + id);
  }

  atualizar(): void {
    // Verifica se o formulário é válido
    if (this.formTutor.form.valid) {
      // Efetivamente atualiza a pessoa
      this.tutorService.atualizar(this.tutor);
      // Redireciona para /pessoas
      this.router.navigate(['/tutores/listar']);
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

}
