import { Injectable } from '@angular/core';
import { Exposicao } from '../interfaces/exposicao';
import { EXPOSICOES } from '../mocks/mock-exposicoes';
import { Observable, of } from 'rxjs';
import { LogsService } from './logs.service';
import { HttpClient } from '@angular/common/http';
import { USUARIO_LOGADO_DB, EDITAL_DB, BASE_API_URL } from '../const/genericConsts';
import { LocalStorageService } from './local-storage.service';

const CRIAR_EXPOSICAO_ENDPOINT = 'exposicoes/criar'


@Injectable({
  providedIn: 'root'
})
export class ExposicoesService {

  constructor(private http: HttpClient,
    private localDB: LocalStorageService,
    private logsService: LogsService) { }

  public getExposicoes(): Observable<Exposicao[]>{
    const exposicoes = of(EXPOSICOES);
    this.logsService.add('ExposicoesService: recuperou exposições');
    return exposicoes;
  }

  public getExposicao(id: string): Observable<Exposicao>{
    const exposicao = EXPOSICOES.find(e => e.id === id)!;
    this.logsService.add(`ExposicoesService: recuperou exposicao id = ${id}`);
    return of(exposicao);
  }

  public criarExposicao(form: any): Observable<any>{

    const formData = new FormData();

    const curador = this.localDB.get(USUARIO_LOGADO_DB);
    const edital = this.localDB.get(EDITAL_DB);

    formData.append('titulo', form.titulo_exposicao);
    formData.append('data_inicio', form.data_inicio);
    formData.append('data_fim', form.data_fim);
    formData.append('edital', edital);
    formData.append('curador', curador);
    formData.append('trabalhos', form.trabalhos_selecionados);

    return this.http.post(BASE_API_URL + '/' + edital + '/' + CRIAR_EXPOSICAO_ENDPOINT, formData);

  }

}
