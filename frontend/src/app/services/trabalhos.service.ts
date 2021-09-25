import { Injectable } from '@angular/core';
import { Trabalho } from '../interfaces/trabalho';

@Injectable({
  providedIn: 'root'
})
export class TrabalhosService {

  constructor() { }

  public getTrabalhosPorUsuario(id: string): Array<Trabalho>{
    return [];

  }
}
