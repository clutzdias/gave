import { Edital } from "./edital";
import { Trabalho } from "./trabalho";

export interface Exposicao {
    id: string;
    edital: string;
    titulo: string;
    data_inicio: Date;
    data_fim: Date;
    curador: string;
    trabalhos: Trabalho[]
}
