import { Fornecedor } from "./fornecedor.model";

export class Produto {
    constructor(
        public recID_Produto?: number,
        public nome?: string,
        public marca?: Number,
        public validade?: Number,
        public quantidadeMinima?: string,
        public quantidadeAtual?: string,
        public valorCusto?: Number,
        public valorVenda?: Number,
        public margemLucro?: Number,
        public comissao?: Number,
        public comissaoSobreLucro?: Number,
        public status?: string,
        public fornecedor?: Fornecedor,
    ) { }
}
