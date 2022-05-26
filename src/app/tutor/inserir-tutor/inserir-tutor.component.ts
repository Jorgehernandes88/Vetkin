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
  res!: any;
  
  constructor(private tutorService: TutorService, private router: Router) { }

  ngOnInit(): void {
    this.tutor = new Tutor();
  }
 
  inserir($event: any){
    if (this.formTutor.form.valid) {
      this.tutor.avatar="";
      this.tutor.receberAvisos="";
    
      this.tutorService.inserirClientes(this.tutor).subscribe(
        {
        next: (res) => {
            if(res){
              this.res = res
            }
         },
        error: (erro: Error) => this.mostrarMensagem(erro.message),
        complete: () => (this.mostrarMensagem(this.res.Status),this.router.navigate(["/tutores/editar/",this.res.idTutorCliente]))
      });
  }
  }

  mostrarMensagem(mensagem : string){
    alert(mensagem);
  }
}
