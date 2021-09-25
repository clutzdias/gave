import { Injectable } from '@angular/core';
import { Exposicao } from '../interfaces/exposicao';
import { EXPOSICOES } from '../mocks/mock-exposicoes';
import { Observable, of } from 'rxjs';
import { LogsService } from './logs.service';


@Injectable({
  providedIn: 'root'
})
export class ExposicoesService {

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

  constructor(private logsService: LogsService) { }
}
