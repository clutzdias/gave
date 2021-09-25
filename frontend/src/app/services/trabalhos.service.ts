import { Injectable } from '@angular/core';
import { Trabalho } from '../interfaces/trabalho';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { USUARIO_LOGADO_DB } from '../const/genericConsts';

@Injectable({
  providedIn: 'root'
})
export class TrabalhosService {

  constructor(private http: HttpClient,
              private localDB: LocalStorageService) { }

  public getTrabalhosPorUsuario(id: string): Array<Trabalho>{
    return [];

  }

  public enviarTrabalho(dados: any){
    const usuario = this.localDB.get(USUARIO_LOGADO_DB);

    const postHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body: HttpParams = new HttpParams()
      .set('titulo', dados.titulo)
      .set('tecnica', dados.tecnica)
      .set('ano', dados.ano)
      .set('resumo', dados.resumo)
      .set('image', dados.image)
      .set('artista', usuario.id);


  }
}
