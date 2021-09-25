import { Edital } from "./edital";

export interface Exposicao {
    id: string;
    edital: Edital;
    titulo: string;
    data_inicio: Date;
    data_fim: Date;
    curador: string;
}
