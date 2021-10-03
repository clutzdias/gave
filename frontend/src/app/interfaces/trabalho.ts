import { Edital } from "./edital";

export interface Trabalho {
    id: string;
    conteudo: string;
    artista: string;
    titulo: string;
    tecnica: string;
    ano: string;
    resumo: string;
    edital: Edital;
}
