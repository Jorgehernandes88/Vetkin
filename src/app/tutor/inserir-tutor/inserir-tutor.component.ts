import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tutor } from 'src/app/shared/models/tutor.model';
import { TutorService } from '../services/tutor.service';

@Component({
  selector: 'app-inserir-tutor',
  templateUrl: './inserir-tutor.component.html',
  styleUrls: ['./inserir-tutor.component.css']
})
export class InserirTutorComponent implements OnInit {

  @ViewChild('formTutor') formTutor!: NgForm;

  tutor!: Tutor;

  
  constructor(private tutorService: TutorService, private router: Router) { }

  ngOnInit(): void {
    this.tutor = new Tutor();
  }
 
  inserir($event: any): void {
    if (this.formTutor.form.valid) {
      this.tutorService.inserir(this.tutor);
      confirm('Tutor foi incluido com sucesso. "' + this.tutor.nome + '"?')
      this.router.navigate(["/tutores/editar",this.tutor.id]);
    }
  }

}
