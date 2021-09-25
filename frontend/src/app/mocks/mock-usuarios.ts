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

const selecionador: Usuario = {id : 'e22ec790-a1a9-4faa-ae81-d4ef51b271cf',
                            cpf : '222333666-72',
                            nome : 'Selecionador 1',
                            email : 'selecionador@email.com',
                            genero : 'feminino',
                            cidade : 'Rio de Janeiro',
                            estado: 'RJ',
                            perfil : TipoPerfilUsuario.Selecionador};

const usuario_simples: Usuario = {id : 'e22ec790-a1a9-4faa-ae81-d4ef51b271cf',
                                cpf : '222333666-72',
                                nome : 'Selecionador 1',
                                email : 'selecionador@email.com',
                                genero : 'feminino',
                                cidade : 'Rio de Janeiro',
                                estado : 'RJ',
                                perfil : TipoPerfilUsuario.Simples};

export const USUARIOS: Array<Usuario> = [artista, selecionador, usuario_simples];
