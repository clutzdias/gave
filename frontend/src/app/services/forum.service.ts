import { LISTA_TOPICOS } from './../const/genericConsts';
import { USUARIO_LOGADO_DB, BASE_API_URL } from '../const/genericConsts';
import { Injectable } from '@angular/core';
import { Topico } from '../interfaces/topico';
import { Mensagem } from '../interfaces/mensagem';
import { Observable, of } from 'rxjs';
import { LogsService } from './logs.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Usuario } from '../interfaces/usuario';
import { formatNumber } from '@angular/common';

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

  public addMensagem(id_topico:string, form: any){
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);

    const id = this.usuario ? this.usuario.id : '';

    let dados: any = {"conteudo": form.value.conteudo}

    const headers = {'Content-Type': 'application/json'}

    return this.http.post(BASE_API_URL + id +  '/' + MENSAGENS + '/' + id_topico, dados, {headers});

  }

  public getMensagensPorTopico(id_topico:string): Observable<Mensagem[]>{

    return this.http.get<Mensagem[]>(BASE_API_URL + id_topico + '/' + MENSAGENS);

  }

  public criarTopico(form: any){
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);

    const id = this.usuario ? this.usuario.id : '';

    let dados: any = {"titulo": form.value.titulo,
                      "conteudo": form.value.conteudo}

    return this.http.post(BASE_API_URL + id + '/' + CRIAR_TOPICO_ENDPOINT, dados);

  }

  public getTopico(id_topico: string): any{
    const topicos: Topico[] = this.localDB.get(LISTA_TOPICOS);

    if (topicos.length > 0){
      let dados = topicos.filter((t) => t.id == id_topico);

      if (dados.length > 0){
        return dados[0];
      }else{
        return null;
      }

    }else{
      return null;
    }

  }

}
