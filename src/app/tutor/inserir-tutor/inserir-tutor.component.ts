import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tutor } from 'src/app/shared/models/tutor.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { TutorService } from '../services/tutor.service';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonpClientBackend } from '@angular/common/http';



@Component({
  selector: 'app-inserir-tutor',
  templateUrl: './inserir-tutor.component.html',
  styleUrls: ['./inserir-tutor.component.css']
})
export class InserirTutorComponent implements OnInit {

  @ViewChild('formTutor') formTutor!: NgForm;

  tutor!: Tutor;
  endereco!: Endereco;
  paciente!: Paciente;
  pacientes: Array<Paciente> = [];
  public activeModal: NgbActiveModal | undefined;

  res!: any;
  
  constructor(private tutorService: TutorService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.tutor = new Tutor();
    this.endereco = new Endereco();
    this.paciente = new Paciente();
  }
 
  inserir($event: any){
    if (this.formTutor.form.valid) {
      this.tutorService.tratarDadosParaInserir(this.tutor,this.endereco,this.pacientes);
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

  bucarCEP($event: any){
    this.tutorService.buscarCEP(this.endereco.cep!.toString()).subscribe(
      {
      next: (res) => {
          if(res){
            this.res = res
          }
       },
      error: (erro: Error) => this.mostrarMensagem(erro.message),
      complete: () => (this.endereco.logradouro = this.res['logradouro'],
                      this.endereco.bairro = this.res['bairro'],
                      this.endereco.localidade = this.res['localidade'],
                      this.endereco.uf = this.res['uf'])
    });

  }

  inserirPaciente($event: any){
    const Localpacientes = this.listarTodosPacientes();
    Localpacientes.push(this.paciente);
    this.pacientes = Localpacientes;
    this.paciente = new Paciente();
    this.fecharModal();
  }

  mostrarMensagem(mensagem : string){
    alert(mensagem);
  }

  abrirModal(template: TemplateRef<any>) {
    const modalRef = this.modalService.open(template);
  }

  fecharModal(){
    const modalRef = this.modalService.dismissAll();    
  }

  listarTodosPacientes(): Paciente[] {
    return this.pacientes;
  }
}
