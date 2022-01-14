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
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required])],
      tecnica: ['', Validators.compose([Validators.required])],
      ano: ['', Validators.compose([Validators.required])],
      resumo: ['', Validators.compose([Validators.required])],
      conteudo: ['', Validators.compose([Validators.required])]
    });
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
