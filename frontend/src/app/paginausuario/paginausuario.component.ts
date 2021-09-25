import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USUARIO_LOGADO_DB } from '../const/localDBconsts';
import { TipoPerfilUsuario } from '../enum/tipoperfilusuario';
import { Trabalho } from '../interfaces/trabalho';
import { Usuario } from '../interfaces/usuario';
import { LocalStorageService } from '../services/local-storage.service';
import { TrabalhosService } from '../services/trabalhos.service';

@Component({
  selector: 'app-paginausuario',
  templateUrl: './paginausuario.component.html',
  styleUrls: ['./paginausuario.component.scss']
})
export class PaginausuarioComponent implements OnInit {

  public usuario?: Usuario;
  public perfilArtista: boolean = false;
  public perfilSelecionador: boolean = false;
  public perfilSimples: boolean = false;
  public trabalhosUsuario?: Trabalho[];
  public trabalhosEdital?: Trabalho[];

  constructor(private localDB: LocalStorageService,
              private formBuilder: FormBuilder,
              private router: Router,
              private trabalhosService: TrabalhosService)
  {
   
  }

  public entrar(){
    this.router.navigate(['login']);

  }

  private inicializarUsuario(){

    const usuario = this.localDB.get(USUARIO_LOGADO_DB);

    if (usuario){
      this.usuario = usuario;

      switch(usuario.perfil){
        case TipoPerfilUsuario.Artista: {
          this.perfilArtista = true;
          break;
        }
        case TipoPerfilUsuario.Selecionador: {
          this.perfilSelecionador = true;
          break;
        }
        case TipoPerfilUsuario.Simples: {
          this.perfilSimples = true;
          break;
        }
        default: {
          this.perfilSimples = true;
          break;
        }
      }
    }
  }

  ngOnInit(): void {
    this.inicializarUsuario();

    if (this.perfilArtista){
      const id = this.usuario ? this.usuario.id : '';
      this.trabalhosUsuario = this.trabalhosService.getTrabalhosPorUsuario(id);
    }

    
  }

}
