import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;
  public mensagemErro: string = '';

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private logsService: LogsService,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])]
    });
  }

  get username(){
    return this.formGroup.get('username');
  }

  get password(){
    return this.formGroup.get('password');
  }

  login(form: any) {
    if (form.valid) {
      const dados = {
        email: form.value.username,
        password: form.value.password
      };

      if(dados.password.length < 6 || dados.password.length > 8){
        this.mensagemErro = 'Senha inválida.';

      }

      const logado = this.loginService.logarUsuario(dados);

      if (!logado) {
        this.mensagemErro = 'Usuário ou senha inválidos.'
      } else {
        this.logsService.add('Login efetuado com sucesso.');
        this.router.navigate(['home']);
      }

    }
  }

  ngOnInit(): void {
  }

}
