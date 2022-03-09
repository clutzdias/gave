import { TipoPerfilUsuario } from "../enum/tipoperfilusuario";
import { Usuario } from "../interfaces/usuario";

const artista: Usuario = {id : 'ac314cf7-ea42-4a89-b559-980983d036fa',
                              cpf : '111222333-44',
                              nome : 'Artista 1',
                              email : 'artista@email.com',
                              genero : 'feminino',
                              cidade : 'Rio de Janeiro',
                              estado : 'RJ',
                              perfil : TipoPerfilUsuario.Artista};

const artista2: Usuario = {id : 'f7a11f9a-6e39-4b71-9a7b-21c020fc8e76',
                              cpf : '111666333-34',
                              nome : 'Artista 2',
                              email : 'artista2@email.com',
                              genero : 'masculino',
                              cidade : 'Rio de Janeiro',
                              estado : 'RJ',
                              perfil : TipoPerfilUsuario.Artista};

const selecionador: Usuario = {id : 'e22ec790-a1a9-4faa-ae81-d4ef51b271cf',
                            cpf : '222333666-72',
                            nome : 'Selecionador 1',
                            email : 'selecionador@email.com',
                            genero : 'feminino',
                            cidade : 'Rio de Janeiro',
                            estado: 'RJ',
                            perfil : TipoPerfilUsuario.Selecionador};

const usuario_simples: Usuario = {id : '89a39c42-f1d3-4b23-bb06-d84454459a77',
                                cpf : '222333666-72',
                                nome : 'Usuário Simples',
                                email : 'usuario@email.com',
                                genero : 'feminino',
                                cidade : 'Rio de Janeiro',
                                estado : 'RJ',
                                perfil : TipoPerfilUsuario.Simples};

export const USUARIOS: Array<Usuario> = [artista, artista2, selecionador, usuario_simples];
