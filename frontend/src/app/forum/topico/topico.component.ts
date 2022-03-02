import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USUARIO_LOGADO_DB } from './../../const/genericConsts';
import { LocalStorageService } from './../../services/local-storage.service';
import { Usuario } from './../../interfaces/usuario';
import { Mensagem } from './../../interfaces/mensagem';
import { ForumService } from './../../services/forum.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topico } from 'src/app/interfaces/topico';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.component.html',
  styleUrls: ['./topico.component.scss']
})
export class TopicoComponent implements OnInit {

  public mensagens: Mensagem[];
  private id_topico: string;
  public topico?: Topico;
  public usuario: Usuario
  public formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private forumService: ForumService,
              private localDB: LocalStorageService,
              private formBuilder: FormBuilder
              ) {
    this.mensagens = [];
    this.usuario = this.localDB.get(USUARIO_LOGADO_DB);
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required])],
      conteudo: ['', Validators.compose([Validators.required])]
    });
    this.id_topico = ""

  }

  getMensagens(id_topico: string){
    this.forumService.getMensagensPorTopico(id_topico)
      .subscribe(dados => this.mensagens = dados)

  }

  public addMensagem(form: any){
    this.forumService.addMensagem(this.id_topico, form)
      .subscribe(
        (res) => {
          this.getMensagens(this.id_topico);

        },
        (err) => {console.log(err),
                  this.getMensagens(this.id_topico)}
      );
      form.reset();

  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.id_topico = id;

    this.topico = this.forumService.getTopico(id);

    this.getMensagens(id);
  }

}
