import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { LocalStorageService } from './local-storage.service';
import { USUARIO_LOGADO_DB, USUARIOS_DB } from '../const/genericConsts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private localDB: LocalStorageService,
              private authService: AuthService) { }

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
      this.authService.authenticate();
      
    }
    return true;
  }

  public logOff(){
    this.localDB.remove(USUARIO_LOGADO_DB);
    this.authService.deauthenticate();
  }

  public getUsuarioLogado(): Usuario {
    return this.localDB.get(USUARIO_LOGADO_DB);
  }
}
