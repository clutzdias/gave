import { ExposicoesService } from 'src/app/services/exposicoes.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EDITAL_DB, USUARIO_LOGADO_DB, USUARIOS_DB } from '../const/genericConsts';
import { TipoPerfilUsuario } from '../enum/tipoperfilusuario';
import { Edital } from '../interfaces/edital';
import { Trabalho } from '../interfaces/trabalho';
import { Usuario } from '../interfaces/usuario';
import { LocalStorageService } from '../services/local-storage.service';
import { TrabalhosService } from '../services/trabalhos.service';
import * as moment from 'moment';
import { Exposicao } from '../interfaces/exposicao';


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
  public formExposicaoGroup: FormGroup;
  private file?: File;
  private edital?: Edital;
  private trabalhosSelecionados: Trabalho[] = [];
  public listaUsuarios: Usuario[] = [];
  public mensagemErro: string = '';
  public exposicaoAtual?: Exposicao;
  private exposicoes: Exposicao[] = [];
  public alteracaoExposicao: boolean = false;

  constructor(private localDB: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private trabalhosService: TrabalhosService,
    private exposicoesService: ExposicoesService) {

    this.formExposicaoGroup = this.formBuilder.group({
      titulo_exposicao: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      data_inicio: [null, Validators.compose([Validators.required, this.dataValida])],
      data_fim: [null, Validators.compose([Validators.required, this.dataValida])],
      trabalhos_selecionados: [[], Validators.compose([Validators.required])]
    });

  }

  get titulo_exposicao(){
    return this.formExposicaoGroup.get('titulo_exposicao');
  }

  get data_inicio(){
    return this.formExposicaoGroup.get('data_inicio');
  }

  get data_fim(){
    return this.formExposicaoGroup.get('data_fim');
  }

  get trabalhos_selecionados(){
    return this.formExposicaoGroup.get('trabalhos_selecionados');
  }

  //Este m�todo ainda precisa ser aprimorado, pois n�o est� fazendo todas as valida��es que deveria
  dataValida(controle: FormControl) {
    let result: ValidationErrors = {}

    const [ano, mes, dia] = ['','','']

    const data = controle.value;
    if (data){
      const [ano, mes, dia] = data.split('-');
    }
    const hoje = new Date();

    let invalido = false
    if (ano.length > 4){
      invalido = true;
    }
    else{
      invalido = moment(data, 'DD/MM/YYYY').isValid()
    }

    if (!invalido) return null

    return {invalidDate: 'invalidDate'}
  }

  public excluirTrabalho(id: string) {

    //console.log(this.exposicaoAtual);

    if (this.exposicaoAtual){
      let trabalho = this.exposicaoAtual.trabalhos.find(t => t.id = id)
      if (trabalho){
        this.mensagemErro = "Esse trabalho não pode ser excluído pois pertence a uma exposição atual."
        return null
      }
    }

    this.trabalhosService.excluirTrabalho(id)
      .subscribe(
        (res) => this.fillTrabalhos(),
        (err) => this.mensagemErro = "Falha ao excluir trabalho"
      );

      return true
  }

  public entrar() {
    this.router.navigate(['login']);

  }

  public onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  public enviar(form: any) {

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

  private fillTrabalhos() {
    const id = this.usuario ? this.usuario.id : '';
    const id_edital = this.edital ? this.edital.id : '';

    if (this.perfilArtista) {
      this.trabalhosService.getTrabalhosPorUsuario(id, id_edital)
        .subscribe(dados => this.trabalhosUsuario = dados);

    } else if (this.perfilSelecionador) {
      this.trabalhosService.getTrabalhosPorEdital(id_edital)
        .subscribe(dados => this.trabalhosEdital = dados);
    }

    console.log("trabalhosEdital: " + this.trabalhosEdital.length);
  }

  public habilitaBotaoEnvio(){
    let retorno: boolean = false
    if (!this.alteracaoExposicao){
      retorno = this.formExposicaoGroup.valid
    }else{
      retorno = true
    }
    return retorno
  }

  private inicializarUsuario() {

    const usuario = this.localDB.get(USUARIO_LOGADO_DB);

    console.log(usuario);

    if (usuario) {
      this.usuario = usuario;

      switch (usuario.perfil) {
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

  public submitExposicao(form: any) {

    if (!form.valid){
      this.mensagemErro = "O formulário deve ter todos os campos preenchidos";
      return false
    }

    if (!this.exposicaoAtual){
      this.exposicoesService.criarExposicao(form)
      .subscribe(
        (res) => {this.mensagemErro = 'Exposição criada com sucesso';
                  this.router.navigate(['/exposicoes'])}, //Incluir l�gica para redirecionar para o componente de exposi��o
        (err) => console.log(err)
      );
    } else {
      const exposicao_id = this.exposicaoAtual ? this.exposicaoAtual.id : '';
      console.log(exposicao_id);
      this.exposicoesService.alterarExposicao(form, exposicao_id)
      .subscribe(
        (res) => {
          this.exposicoesService.getExposicao(exposicao_id)
            .subscribe(dados => this.exposicaoAtual = dados);
          this.alteracaoExposicao = true;
          this.mensagemErro = 'Exposição alterada com sucesso'

        },
        (err) => this.mensagemErro = 'Falha ao alterar dados de exposição'
      );
    }
    return true

  }

  public alterarExposicao(){
    this.alteracaoExposicao = false;
    this.habilitaBotaoEnvio();
  }

  get trabalhosFormArray() {
    return this.formExposicaoGroup.controls.trabalhos as FormArray;
  }

  private getExposicaoAtual(exposicoes: Exposicao[]){
    if (exposicoes){
      this.exposicoesService.getExposicao(exposicoes[0].id)
      .subscribe(dados => {
        this.exposicaoAtual = dados;
        this.alteracaoExposicao = true;
        console.log('dentro do getexposicao');
        console.log(this.exposicaoAtual);

      });
    }

  }

  /* private ultimaExposicao(exposicao){
    const today = new Date;

    return exposicao.data_inicio <= today && exposicao.data_fim <= today
  } */

  ngOnInit(): void {

    this.edital = this.localDB.get(EDITAL_DB);

    this.listaUsuarios = this.localDB.get(USUARIOS_DB);

    this.inicializarUsuario();

    this.fillTrabalhos();

    const today = new Date;

    this.exposicoesService.getExposicoes()
                        .subscribe(dados =>{
                          this.exposicoes = dados;
                          this.getExposicaoAtual(this.exposicoes);
                        });




    /* this.exposicaoAtual = this.exposicoes.find(e => {
      (e.data_inicio <= today && e.data_fim>= today)
    }) */




  }

}
