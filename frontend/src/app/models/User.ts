export interface User {
    id: string;
    nome: string;
    cpf: string;
    nascimento: string;
    email: string;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento?: string;
}