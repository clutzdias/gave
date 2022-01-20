import { LISTA_TOPICOS } from './../const/genericConsts';
import { Component, OnInit } from '@angular/core';
import { USUARIO_LOGADO_DB } from '../const/genericConsts';
import { Topico } from '../interfaces/topico';
import { Usuario } from '../interfaces/usuario';
import { ForumService } from '../services/forum.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public topicos: Topico[]
  public usuario: Usuario

  constructor(private forumService: ForumService,
              private localDB: LocalStorageService) {

    this.topicos = []
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);
  }

  public getTopicos() {
    this.forumService.getTopicos()
      .subscribe(dados => {this.topicos = dados;
                          this.localDB.set(LISTA_TOPICOS, dados)
                          });

  }

  public criarTopico(){
    console.log('criar topico');
  }

  ngOnInit(): void {
    this.getTopicos();

  }

}
