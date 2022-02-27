import { Injectable } from '@angular/core';
import { Trabalho } from '../interfaces/trabalho';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { EDITAL_DB, URL_DRIVE, USUARIO_LOGADO_DB } from '../const/genericConsts';
import { BASE_API_URL } from '../const/genericConsts';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CRIAR_TRABALHOS_ENDPOINT: string = 'trabalhos/criar';
const TRABALHOS_ENDPOINT: string = 'trabalhos';



@Injectable({
  providedIn: 'root'
})
export class TrabalhosService {

  constructor(private http: HttpClient,
              private localDB: LocalStorageService) { }

  public getTrabalhosPorUsuario(id: string, id_edital: string): Observable<Trabalho[]>{

    return this.http.get<Trabalho[]>(BASE_API_URL + id_edital + '/' + TRABALHOS_ENDPOINT + '/' + id);

  }

  public getTrabalhosPorEdital(id_edital: string): Observable<Trabalho[]>{

    return this.http.get<Trabalho[]>(BASE_API_URL + id_edital + '/' + TRABALHOS_ENDPOINT);
  }

  public enviarTrabalho(form: any): Observable<any>{

    const formData = new FormData();

    const usuario = this.localDB.get(USUARIO_LOGADO_DB);
    const edital = this.localDB.get(EDITAL_DB);

    const id_imagem = this.getIdImagemDrive(form.value.conteudo);
    const url_imagem = URL_DRIVE + id_imagem;

    formData.append('titulo', form.value.titulo);
    formData.append('tecnica', form.value.tecnica);
    formData.append('ano', form.value.ano);
    formData.append('resumo', form.value.resumo);
    formData.append('conteudo', url_imagem);
    formData.append('artista', usuario.id);
    formData.append('edital', edital.id);

    return this.http.post(BASE_API_URL + CRIAR_TRABALHOS_ENDPOINT, formData);

  }

  private getIdImagemDrive(url: string): string {

    const indexInicio = url.indexOf("/d/") + 3;

    const indexFim = url.indexOf("/view");

    return url.slice(indexInicio, indexFim);

  }

  public getTrabalho(id: string){
    return this.http.get<Trabalho>(BASE_API_URL + TRABALHOS_ENDPOINT + '/' + id);
  }

  public excluirTrabalho(id: string){
    const usuario = this.localDB.get(USUARIO_LOGADO_DB);
    return this.http.delete(BASE_API_URL + TRABALHOS_ENDPOINT + '/' + usuario.id + '/excluir/' + id)
            .pipe(catchError(this.handleError));
  }

  handleError(error){
        let errorMessage = '';

        if (error.error instanceof ErrorEvent){
          errorMessage = `Error: $error.error.message`;
        }else{
          errorMessage = `Error Code: $error.statusnMessage: $error.message`;
        };
        console.log(errorMessage);
        return throwError(errorMessage);
  }
}


