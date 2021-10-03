import { Component, HostListener, OnDestroy } from '@angular/core';
import { USUARIO_LOGADO_DB } from './const/genericConsts';
import { Usuario } from './interfaces/usuario';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'gave';
  constructor(){
  }

  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(){
    localStorage.clear();
  }

  ngOnDestroy(){
    localStorage.clear();

  }
}
