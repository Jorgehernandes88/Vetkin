import { Endereco } from "./endereco.model";
import { Paciente } from "./paciente.model";

export class Tutor 
{
    constructor(
        public recID_TutorCliente?: number,
        public nomeCompleto?: string,
        public email?: string,
        public profissao?: string,
        public cpf?: string,
        public telefone?: string,
        public receberAvisos?: string,
        public avatar?: string,
        public endereco?: Endereco,
        public paciente?: Paciente[],
         ) { }
}
