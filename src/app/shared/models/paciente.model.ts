export class Paciente 
{
    constructor(
        public id?:   number,
        public nome?: string,
        public raca?: string,
        public idade?:string,
        public vivo?: boolean,
        public castrado?: string,
        public foto?: string,
        public especie?: string,
        public IDproprietario?: number,
    ){}
}
