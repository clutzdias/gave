import { Injectable } from '@angular/core';
import { Exposicao } from '../interfaces/exposicao';
import { Observable, of } from 'rxjs';
import { LogsService } from './logs.service';
import { HttpClient } from '@angular/common/http';
import { USUARIO_LOGADO_DB, EDITAL_DB, BASE_API_URL } from '../const/genericConsts';
import { LocalStorageService } from './local-storage.service';

const CRIAR_EXPOSICAO_ENDPOINT = 'exposicoes/criar'
const EXPOSICOES_ENDPOINT = 'exposicoes'
const EXPOSICAO_POR_EDITAL_ENDPOINT = 'exposicoes/edital'


@Injectable({
  providedIn: 'root'
})
export class ExposicoesService {

  constructor(private http: HttpClient,
    private localDB: LocalStorageService,
    private logsService: LogsService) { }

  public getExposicoes(): Observable<Exposicao[]>{
    return this.http.get<Exposicao[]>(BASE_API_URL + EXPOSICOES_ENDPOINT);
  }

  public getExposicao(id: string): Observable<Exposicao>{
    return this.http.get<Exposicao>(BASE_API_URL + EXPOSICOES_ENDPOINT + '/' + id);
  }

  public criarExposicao(form: any): Observable<any>{

    const formData = new FormData();

    const curador = this.localDB.get(USUARIO_LOGADO_DB);
    const edital = this.localDB.get(EDITAL_DB);

    let dados = {"titulo": form.value.titulo_exposicao,
                 "data_inicio": form.value.data_inicio,
                 "data_fim": form.value.data_fim,
                 "edital": edital.id,
                 "curador": curador.id,
                 "trabalhos": form.value.trabalhos_selecionados}

    /* formData.append('titulo', form.titulo_exposicao);
    formData.append('data_inicio', form.data_inicio);
    formData.append('data_fim', form.data_fim);
    formData.append('edital', edital);
    formData.append('curador', curador);
    formData.append('trabalhos', form.trabalhos_selecionados); */

    return this.http.post(BASE_API_URL + edital + '/' + CRIAR_EXPOSICAO_ENDPOINT, dados);

  }

  public alterarExposicao(form: any, id_exposicao: string): Observable<any> {
    let dados = {"titulo": form.value.titulo_exposicao,
                 "data_inicio": form.value.data_inicio,
                 "data_fim": form.value.data_fim,
                 "trabalhos": form.value.trabalhos_selecionados}
    return this.http.patch(BASE_API_URL + EXPOSICOES_ENDPOINT + '/' + id_exposicao, dados);
  }

  public getExposicaoPorEdital(id_edital: string): Observable<any>{
    return this.http.get(BASE_API_URL + EXPOSICAO_POR_EDITAL_ENDPOINT + '/' + id_edital);
  }



}
