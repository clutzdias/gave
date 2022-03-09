import { ForumService } from './../../services/forum.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-topico',
  templateUrl: './form-topico.component.html',
  styleUrls: ['./form-topico.component.scss']
})
export class FormTopicoComponent implements OnInit {

  public formGroup: FormGroup;
  public enviando: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private forumService: ForumService)
  {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required])],
      conteudo: ['', Validators.compose([Validators.required])]
    });
  }

  get titulo(){
    return this.formGroup.get('titulo');
  }

  get conteudo(){
    return this.formGroup.get('conteudo');
  }


  public enviar(form: FormGroup){
    console.log()

    this.forumService.criarTopico(form)
        .subscribe(
          (res) => {this.enviando = false,
                    this.router.navigate(['/forum'])},
          (err) => this.enviando = false
        );

  }

  public back(){
    this.router.navigate(['/forum']);
  }

  ngOnInit(): void {
  }

}
