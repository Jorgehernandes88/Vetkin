import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutor } from 'src/app/shared/models/tutor.model';
import { TutorService } from '../services/tutor.service';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.css']
})
export class EditarTutorComponent implements OnInit {

  @ViewChild('formTutor') formTutor!: NgForm;

  tutor!: Tutor;

  constructor(private tutorService: TutorService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // snapshot.params de ActivatedRoute d� acesso aos par�metros passados
    // Operador + (antes do this) converte para n�mero
    let id = +this.route.snapshot.params['id'];
    // Com o id, obt�m a pessoa
    const res = this.tutorService.buscarPorId(id);
    if (res !== undefined)
      this.tutor = res;
    else
      throw new Error("Tutor n�o encontrada: id = " + id);
  }

  atualizar(): void {
    // Verifica se o formul�rio � v�lido
    if (this.formTutor.form.valid) {
      // Efetivamente atualiza a pessoa
      this.tutorService.atualizar(this.tutor);
      // Redireciona para /pessoas
      this.router.navigate(['/tutores/listar']);
    }
  }

}
