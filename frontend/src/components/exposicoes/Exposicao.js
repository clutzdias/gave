import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Trabalho from '../trabalho/Trabalho'


const Exposicao = () => {

    const trabalhos = [
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

    const exposicao = useSelector(state => state.exposicao)

    return (
        <section>
            <h1>{exposicao.titulo}</h1>
            <h2>Curador: {exposicao.curador}</h2>
            <p>Início: {exposicao.data_inicio}</p>
            <p>Término: {exposicao.data_fim}</p>
            <div>{trabalhos.map((trabalho) => {
                <Trabalho key={trabalho.conteudo}
                        url= {trabalho.conteudo} 
                        titulo={trabalho.titulo}
                        artista={trabalho.artista}
                        ano={trabalho.ano}
                        tecnica={trabalho.tecnica}
                        resumo={trabalho.resumo}></Trabalho>
            })}</div>
        </section>
    )
}

export default Exposicao
