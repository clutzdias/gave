import { USUARIO_LOGADO_DB, BASE_API_URL } from '../const/genericConsts';
import { Injectable } from '@angular/core';
import { Topico } from '../interfaces/topico';
import { Mensagem } from '../interfaces/mensagem';
import { Observable, of } from 'rxjs';
import { LogsService } from './logs.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Usuario } from '../interfaces/usuario';

const CRIAR_TOPICO_ENDPOINT = 'topicos/criar'
const LISTAR_TOPICOS = 'topicos'
const MENSAGENS = 'mensagens'


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private usuario?: Usuario;

  constructor(private http: HttpClient,
              private localDB: LocalStorageService) { }


  public getTopicos(): Observable<Topico[]>{
    return this.http.get<Topico[]>(BASE_API_URL + LISTAR_TOPICOS);

  }

  public addMensagem(id_topico:string, mensagem:Mensagem){
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);

    const id = this.usuario ? this.usuario.id : '';

    return this.http.post(BASE_API_URL + '/' + id +  '/' + MENSAGENS + '/' + id_topico, mensagem);

  }

  public getMensagensPorTopico(id_topico:string): Observable<Mensagem[]>{

    return this.http.get<Mensagem[]>(BASE_API_URL + '/' + id_topico + '/' + MENSAGENS);

  }

  public criarTopico(topico: Topico){
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);

    const id = this.usuario ? this.usuario.id : '';

    return this.http.post(BASE_API_URL + '/' + id + '/' + CRIAR_TOPICO_ENDPOINT, topico);

  }

}
