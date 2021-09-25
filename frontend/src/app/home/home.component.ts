import { Component, OnInit } from '@angular/core';
import { Exposicao } from '../interfaces/exposicao';
import { ExposicoesService } from '../services/exposicoes.service';
import { LocalStorageService } from '../services/local-storage.service';
import { USUARIOS } from '../mocks/mock-usuarios';
import { EDITAL } from '../mocks/mock-edital';
import { USUARIOS_DB, EDITAL_DB } from '../const/localDBconsts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exposicoes: Exposicao[] = [];

  constructor(private exposicoesService: ExposicoesService,
              private localDB: LocalStorageService) 
  { }

  private getExposicoes():void {
    this.exposicoesService.getExposicoes()
      .subscribe(exposicoes => this.exposicoes = exposicoes.slice(0,1));
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
    this.getExposicoes();
    
  }

}
