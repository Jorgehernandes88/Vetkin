import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  @ViewChild('formPaciente') formPaciente!: NgForm;

  paciente!: Paciente;

  constructor(private pacienteService: PacienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // snapshot.params de ActivatedRoute d� acesso aos par�metros passados
    // Operador + (antes do this) converte para n�mero
    let id = +this.route.snapshot.params['id'];
    // Com o id, obt�m a pessoa
    const res = this.pacienteService.buscarPorId(id);
    if (res !== undefined)
      this.paciente = res;
    else
      throw new Error("Paciente n�o encontrado: id = " + id);
  }

  atualizar(): void {
    // Verifica se o formul�rio � v�lido
    if (this.formPaciente.form.valid) {
      // Efetivamente atualiza a pessoa
      this.pacienteService.atualizar(this.paciente);
      // Redireciona para /pessoas
      this.router.navigate(['/pacientes']);
    }
  }

}
