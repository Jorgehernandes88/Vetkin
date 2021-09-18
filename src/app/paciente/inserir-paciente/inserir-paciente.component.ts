import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-inserir-paciente',
  templateUrl: './inserir-paciente.component.html',
  styleUrls: ['./inserir-paciente.component.css']
})
export class InserirPacienteComponent implements OnInit {

  @ViewChild('formPaciente') formPaciente!: NgForm;

  paciente!: Paciente;


  constructor(private pacienteService: PacienteService, private router: Router) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
  }

  inserir(): void {
    if (this.formPaciente.form.valid) {
      this.pacienteService.inserir(this.paciente);
      this.router.navigate(["/pacientes"]);
    }
  }

}
