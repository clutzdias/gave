import { TipoPerfilUsuario } from '../enum/tipoperfilusuario';

export interface Usuario {
    id: string;
    cpf: string;
    nome: string;
    email: string;
    genero: string;
    cidade: string;
    estado: string;
    perfil: TipoPerfilUsuario;
}
