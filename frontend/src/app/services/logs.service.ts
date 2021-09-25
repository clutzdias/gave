import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  public mensagens: string[] = [];

  public add(mensagem: string){
    this.mensagens.push(mensagem);
  }

  public clear(){
    this.mensagens = [];
  }

}
