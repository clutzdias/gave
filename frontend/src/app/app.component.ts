import { Component, HostListener, OnDestroy } from '@angular/core';
import { EDITAL_DB, USUARIOS_DB } from './const/genericConsts';
import { EDITAL } from './mocks/mock-edital';
import { USUARIOS } from './mocks/mock-usuarios';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'gave';

  constructor(private localDB: LocalStorageService){
  }

  private initLocalDB(){
    if (!this.localDB.get(USUARIOS_DB)){
      const usuarios = USUARIOS;
      this.localDB.set(USUARIOS_DB, usuarios);

    }
    if (!this.localDB.get(EDITAL_DB)){
      const edital = EDITAL;
      this.localDB.set(EDITAL_DB, edital);

    }
  }

  ngOnInit(): void {
    this.initLocalDB();
  }

  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(){
    localStorage.clear();
  }

  ngOnDestroy(){
    localStorage.clear();

  }
}
