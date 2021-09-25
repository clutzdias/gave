import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USUARIO_LOGADO_DB } from '../const/genericConsts';
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
  public trabalhosUsuario: Trabalho[] = [];
  public trabalhosEdital?: Trabalho[];
  public formGroup: FormGroup;
  private file?: File;

  constructor(private localDB: LocalStorageService,
              private formBuilder: FormBuilder,
              private router: Router,
              private trabalhosService: TrabalhosService)
  {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required])],
      tecnica: ['', Validators.compose([Validators.required])],
      ano: ['', Validators.compose([Validators.required])],
      resumo: ['', Validators.compose([Validators.required])],
      image: ['']
    });
   
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
    const formData = new FormData();

    if (form.valid) {
      /* const dados = {
                      titulo: form.value.titulo,
                      tecnica: form.value.tecnica,
                      ano: form.value.ano,
                      resumo: form.value.resumo
                    }; */

      formData.append('titulo', form.value.titulo);
      formData.append('tecnica', form.value.tecnica);
      formData.append('ano', form.value.ano);
      formData.append('resumo', form.value.resumo);

      this.formGroup.get('image')?.setValue(this.file);
      formData.append('image', this.formGroup.get('image')?.value);

      this.trabalhosService.enviarTrabalho(formData);          
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
