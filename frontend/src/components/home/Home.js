import React from 'react'
import Exposicao from '../exposicoes/Exposicao';
import Exposicoes from '../exposicoes/Exposicoes';
import Forum from '../forum/Forum';

const exposicaoMock = {
    id: "",
    titulo: "Exposicao de Inauguracao da GAVE",
    data_inicio: "2021-09-01",
    data_fim: "2021-12-31",
    curador: "Curador 1",
    trabalhos: [
        {
            conteudo: "C:/home/carlalutz/Imagens/tcc/starry_night_van_gogh.jpg",
            titulo: "Noite Estrelada",
            tecnica: "Óleo sobre tela",
            ano: "1889",
            resumo: "Paisagem com fundo azul escuro e estrelas em estilo borrado",
            artista: "Vincent van Gogh"
        },
        {
            conteudo: "C:/home/carlalutz/Imagens/tcc/o_grito_edward_munch.jpg",
            titulo: "O grito",
            tecnica: "Têmpera e pastel sobre tela",
            ano: "1893",
            resumo: "Pessoa sobre uma ponte com cara de susto com paisagem ao fundo",
            artista: "Edward Munch"
        },
        {
            conteudo: "C:/home/carlalutz/Imagens/tcc/kandinsky.jpg",
            titulo: "Linha transversal",
            tecnica: "Óleo sobre tela",
            ano: "1923",
            resumo: "Arte abstrata com linhas e figuras geométricas",
            artista: "Wassily Kandinsky"
        }
    ]
};

const Home = () => {
    return (
        <main>
            <div>
                <Exposicao exposicao={exposicaoMock}></Exposicao>
                <Exposicoes></Exposicoes>
                <Forum></Forum>
            </div>
        </main>
    )
}

export default Home;
