import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { LocalStorageService } from './local-storage.service';
import { USUARIO_LOGADO_DB, USUARIOS_DB } from '../const/localDBconsts';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private localDB: LocalStorageService) { }

  public logarUsuario(dados: {email?: string, password?: string}): boolean{
    const usuariosCadastrados: Array<Usuario> = this.localDB.get(USUARIOS_DB);

    const usuario = usuariosCadastrados.find((u: Usuario) => {
      if (dados.email){
        return u.email === dados.email;
      }
      return null;
    });

    if(!usuario){
      return false;
    }else{
      this.localDB.set(USUARIO_LOGADO_DB, usuario);
      
    }
    return true;
  }
}
