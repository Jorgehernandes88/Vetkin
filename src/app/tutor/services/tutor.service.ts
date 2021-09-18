import { Injectable } from '@angular/core';

import { Tutor } from 'src/app/shared/models/tutor.model';

const LS_CHAVE: string = "tutores";

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor() { }

  listarTodos(): Tutor []{
    const tutores = localStorage[LS_CHAVE];
    return tutores ? JSON.parse(tutores): [];
  }

  inserir(tutor: Tutor): void {
    //Obtem a lista completa de pessoas
    const tutores = this.listarTodos();

    tutor.id = new Date().getTime();
  
    tutores.push(tutor);

    localStorage[LS_CHAVE] = JSON.stringify(tutores);
  }
  
  buscarPorId(id: number): Tutor | undefined{
    const tutores: Tutor[] = this.listarTodos();
  
    return tutores.find(tutor => tutor!.id === id);
  }
  
  atualizar(tutor: Tutor): void{
    const tutores: Tutor[] = this.listarTodos();

    tutores.forEach((obj,index,objs)=>{
      if(tutor.id === obj.id){
        objs[index] = tutor
      }
    });
  
    localStorage[LS_CHAVE] = JSON.stringify(tutores);
  
  }
  
  remover(id: number):void{

    let tutores: Tutor[] = this.listarTodos();
  
    tutores = tutores.filter(tutor => tutor.id !== id);
  
    //atualiza a lista de pessoas
    localStorage[LS_CHAVE] = JSON.stringify(tutores);
  }

}
