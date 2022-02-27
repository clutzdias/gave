import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabalho } from 'src/app/interfaces/trabalho';
import { TrabalhosService } from 'src/app/services/trabalhos.service';

@Component({
  selector: 'app-form-trabalho',
  templateUrl: './form-trabalho.component.html',
  styleUrls: ['./form-trabalho.component.scss']
})
export class FormTrabalhoComponent implements OnInit {

  public trabalho: Trabalho = {} as Trabalho;
  public enviando: boolean = false;

  public formGroup: FormGroup;

  constructor(private trabalhosService: TrabalhosService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router)
  {
    const hoje = new Date;
    const ano = hoje.getFullYear()
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required])],
      tecnica: ['', Validators.compose([Validators.required])],
      ano: ['', Validators.compose([Validators.required, Validators.max(ano), Validators.min(1920)])],
      resumo: ['', Validators.compose([Validators.required])],
      conteudo: ['', Validators.compose([Validators.required])]
    });
  }

  get titulo(){
    return this.formGroup.get('titulo');
  }

  get tecnica(){
    return this.formGroup.get('tecnica');
  }

  get ano(){
    return this.formGroup.get('ano');
  }

  get resumo(){
    return this.formGroup.get('resumo');
  }

  get conteudo(){
    return this.formGroup.get('conteudo');
  }

  public enviar(form: any){
    this.enviando = true;

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
          (res) => {this.enviando = false,
                    this.router.navigate(['/areausuario'])},
          (err) => this.enviando = false
        );

  }

  public back(){
    this.router.navigate(['/areausuario']);

  }

  private getTrabalho(id: string){
    this.trabalhosService.getTrabalho(id)
      .subscribe(dados => {
        this.trabalho = dados;
        this.formGroup.patchValue(this.trabalho);
      });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null){
      this.getTrabalho(id);
    }

  }

}
