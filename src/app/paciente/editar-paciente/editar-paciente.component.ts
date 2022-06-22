import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { Tutor } from 'src/app/shared/models/tutor.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  @ViewChild('formPaciente') formPaciente!: NgForm;

  paciente!: Paciente;
  tutor!: Tutor;
  resultado!: any;

  constructor(private pacienteService: PacienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tutor = new Tutor();
    this.preencherCamposPaciente(+this.route.snapshot.params['id']);
  }

  preencherCamposPaciente(id: number) {
    this.pacienteService.buscaPorIDPaciente(id.toString()).subscribe(
      {
        next: (resultado) => {
          if (resultado) {
            this.resultado = resultado
          }
        },
        error: (erro: Error) => this.mostrarMensagem(erro.message),
        complete: () => (this.paciente = this.resultado,
          this.tutor = this.resultado['tutor'])
      }
    )
  }

  atualizar(): void {
    if (this.formPaciente.form.valid) {
      this.pacienteService.atualizarPaciente(this.paciente).subscribe(
        {
          next: (resultado) => {
            if (resultado) {
              this.resultado = resultado
            }
          },
          error: (erro: Error) => this.mostrarMensagem(erro.message),
          complete: () => (this.mostrarMensagem(this.resultado.Status), this.router.navigate(['/pacientes/listar']))
        });
    }
  }

  mostrarMensagem(mensagem: string) {
    alert(mensagem);
  }

}
