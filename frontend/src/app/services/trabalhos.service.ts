import { Injectable } from '@angular/core';
import { Trabalho } from '../interfaces/trabalho';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { USUARIO_LOGADO_DB } from '../const/genericConsts';
import { BASE_API_URL } from '../const/genericConsts';
import { Observable } from 'rxjs';

const CRIAR_TRABALHOS_ENDPOINT: string = 'trabalhos/criar';

@Injectable({
  providedIn: 'root'
})
export class TrabalhosService {

  constructor(private http: HttpClient,
              private localDB: LocalStorageService) { }

  public getTrabalhosPorUsuario(id: string): Array<Trabalho>{
    return [];

  }

  public enviarTrabalho(form: any, file: File): Observable<any>{

    const formData = new FormData();

    const usuario = this.localDB.get(USUARIO_LOGADO_DB);

    formData.append('titulo', form.value.titulo);
    formData.append('tecnica', form.value.tecnica);
    formData.append('ano', form.value.ano);
    formData.append('resumo', form.value.resumo);
    formData.append('image', file);
    formData.append('artista', usuario.id); 
    
    console.log('arquivo');
    console.log(file.name);
    console.log('dados do formulário');
    console.log(formData.get('image'));

    return this.http.post(BASE_API_URL + CRIAR_TRABALHOS_ENDPOINT, formData);
 
  }
}
