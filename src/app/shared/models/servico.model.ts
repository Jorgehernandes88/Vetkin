export class Servico {
    constructor(
        public recID_Servico?: number,
        public nome?: string,
        public valorCusto?: Number,
        public valorVenda?: Number,
        public status?: string,
    ) { }
}