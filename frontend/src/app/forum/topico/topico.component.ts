import { USUARIO_LOGADO_DB } from './../../const/genericConsts';
import { LocalStorageService } from './../../services/local-storage.service';
import { Usuario } from './../../interfaces/usuario';
import { Mensagem } from './../../interfaces/mensagem';
import { ForumService } from './../../services/forum.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.component.html',
  styleUrls: ['./topico.component.scss']
})
export class TopicoComponent implements OnInit {

  public mensagens: Mensagem[]
  public usuario: Usuario

  constructor(private route: ActivatedRoute,
              private forumService: ForumService,
              private localDB: LocalStorageService) {
    this.mensagens = [];
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);
  }

  getMensagens(id_topico: string){
    this.forumService.getMensagensPorTopico(id_topico)
      .subscribe(dados => this.mensagens = dados)

  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.getMensagens(id);
  }

}
