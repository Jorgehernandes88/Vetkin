import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutor } from 'src/app/shared/models/tutor.model';
import { TutorService } from '../services/tutor.service';

import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.css']
})
export class EditarTutorComponent implements OnInit {

  @ViewChild('formTutor') formTutor!: NgForm;
  @ViewChild('formPaciente') formPaciente!: NgForm;

  public activeModal: NgbActiveModal | undefined;
  tutor!: Tutor;
  endereco!: Endereco;
  paciente!: Paciente;
  pacientes: Paciente[] = [];
  res!: any;
  
  public idTutor?: number = +this.route.snapshot.params['id'];
  displayStyle = "none";

  


  constructor(private tutorService: TutorService, private router: Router, private route: ActivatedRoute, private pacienteService: PacienteService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
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
        complete: () => (this.tutor = this.res,
          this.pacientes = this.res['paciente'],
          this.endereco = this.res['endereco'])
      }
    )
  }

  atualizar(): void {
    if (this.formTutor.form.valid) {
      this.tutorService.tratarDadosParaInserir(this.tutor,this.endereco,this.pacientes);
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

  inserirPacienteBKP(): void {
    if (this.formPaciente.form.valid) {
      this.paciente.IDproprietario = this.idTutor;
      this.pacienteService.inserir(this.paciente);
      document.location.reload();
    }
  }

  inserirPaciente($event: any){
    const Localpacientes = this.listarTodosPacientes();
    Localpacientes.push(this.paciente);
    this.pacientes = Localpacientes;
    this.paciente = new Paciente();
    this.fecharModal();
  }

  listarTodosPacientes(): Paciente[] {
    return this.pacientes;
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

  mostrarMensagem(mensagem : string){
    alert(mensagem);
  }

  abrirModal(template: TemplateRef<any>) {
    const modalRef = this.modalService.open(template);
  }

  fecharModal(){
    const modalRef = this.modalService.dismissAll();    
  }

}
