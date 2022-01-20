import { ExposicoesService } from 'src/app/services/exposicoes.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { EDITAL_DB, USUARIO_LOGADO_DB, USUARIOS_DB } from '../const/genericConsts';
import { TipoPerfilUsuario } from '../enum/tipoperfilusuario';
import { Edital } from '../interfaces/edital';
import { Trabalho } from '../interfaces/trabalho';
import { Usuario } from '../interfaces/usuario';
import { USUARIOS } from '../mocks/mock-usuarios';
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
  public perfilAdministrador: boolean = false;
  public trabalhosUsuario: Trabalho[] = [];
  public trabalhosEdital: Trabalho[] = [];
  public formGroup: FormGroup;
  public formExposicaoGroup: FormGroup;
  private file?: File;
  private edital?: Edital;
  private trabalhosSelecionados: Trabalho[] = [];
  public listaUsuarios: Usuario[] = [];

  constructor(private localDB: LocalStorageService,
              private formBuilder: FormBuilder,
              private router: Router,
              private trabalhosService: TrabalhosService,
              private exposicoesService: ExposicoesService)
  {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required])],
      tecnica: ['', Validators.compose([Validators.required])],
      ano: ['', Validators.compose([Validators.required])],
      resumo: ['', Validators.compose([Validators.required])],
      conteudo: ['', Validators.compose([Validators.required])]
    });

    this.formExposicaoGroup = this.formBuilder.group({
      titulo_exposicao: ['', Validators.compose([Validators.required])],
      data_inicio: ['', Validators.compose([Validators.required])],
      data_fim: ['', Validators.compose([Validators.required])],
      trabalhos_selecionados: ['', Validators.compose([Validators.required])]
    });

  }

  public excluirTrabalho(id: string){

  }

  public entrar(){
    this.router.navigate(['login']);

  }

  public onSelectFile(event: any){
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  public enviar(form: any){

    /* console.log(form);

    if (this.file != null){
      this.trabalhosService.enviarTrabalho(form, this.file)
        .subscribe(
          (res) => this.fillTrabalhos(),
          (err) => console.log(err)
        );
    } */

    this.trabalhosService.enviarTrabalho(form)
      .subscribe(
        (res) => this.fillTrabalhos(),
        (err) => console.log(err)
      );

  }

  private fillTrabalhos(){
    const id = this.usuario ? this.usuario.id : '';
    const id_edital = this.edital ? this.edital.id : '';

    if (this.perfilArtista){
      this.trabalhosService.getTrabalhosPorUsuario(id, id_edital)
        .subscribe(dados => this.trabalhosUsuario = dados);

    } else if (this.perfilSelecionador){
      this.trabalhosEdital = this.trabalhosService.getTrabalhosPorEdital(id_edital);
    }
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
        case TipoPerfilUsuario.Administrador: {
          this.perfilAdministrador = true;
          break;
        }
        default: {
          this.perfilSimples = true;
          break;
        }
      }
    }
  }

  public submitExposicao(){

    this.exposicoesService.criarExposicao(this.formExposicaoGroup)
      .subscribe(
        (res) => console.log(res), //Incluir lógica para redirecionar para o componente de exposição
        (err) => console.log(err)
      );
  }

  get trabalhosFormArray(){
    return this.formExposicaoGroup.controls.trabalhos as FormArray;
  }

  ngOnInit(): void {

    this.edital = this.localDB.get(EDITAL_DB);

    this.listaUsuarios = this.localDB.get(USUARIOS_DB);

    this.inicializarUsuario();

    this.fillTrabalhos();

  }

}
