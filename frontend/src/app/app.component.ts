import { Component } from '@angular/core';
import { USUARIO_LOGADO_DB } from './const/genericConsts';
import { Usuario } from './interfaces/usuario';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public usuarioLogado?: Usuario;
  title = 'gave';

  constructor(private localDB: LocalStorageService){
    this.usuarioLogado = this.localDB.get(USUARIO_LOGADO_DB);

  }
}
