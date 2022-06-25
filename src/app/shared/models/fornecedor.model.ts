export class Fornecedor {
    constructor(
        public recID_Fornecedor?: number,
        public empresa?: string,
        public nome?: string,
        public cnpj?: string,
        public inscricaoEstadual?: string,
        public contato?: string,
        public score?: string,
         ) { }
}