import { Tutor } from "./tutor.model";

export class Paciente 
{
    constructor(
        public recID_Paciente?:   number,
        public nome?: string,
        public especie?: string,
        public dataNacimento?: string,
        public raca?: string,
        public racaSecundaria?: string,
        public porte?: string,
        public alergias?: string,
        public observacoes?: string,
        public sexo?: string,
        public agressivo?: string,
        public status?: string,
        public aptoAReproducao?: string,
        public pedigree?: string,
        public microchip?: string,
        public avatar?: string,
        public IDproprietario?: number,
        
        public idade?:string,
        public vivo?: boolean,
        public castrado?: string,
        public tutor?: Tutor,
    ){}
}
