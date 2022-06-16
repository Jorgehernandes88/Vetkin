export class Endereco 
{
    constructor(
        public RecID_Endereco?: number,
        public cep?: string,
        public logradouro?: string,
        public complemento?: string,
        public bairro?: string,
        public localidade?: string,
        public uf?: string,
         ) { }
}
