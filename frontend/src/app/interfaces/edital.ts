export interface Edital {
    id: string
    titulo: string
    descricao: string
    exigencias: string
    data_inicio: Date
    data_fim: Date
    vigente: boolean
    quantidade_obras: number
}
