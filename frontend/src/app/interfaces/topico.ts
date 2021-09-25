import { Mensagem } from "./mensagem";

export interface Topico {
    id: string;
    titulo: string;
    mensagens?: Mensagem[];
    usuario_criador: string;
    data_criacao: Date;
}
