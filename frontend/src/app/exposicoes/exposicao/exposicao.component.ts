import { Component, Input, OnInit } from '@angular/core';
import { Exposicao } from 'src/app/interfaces/exposicao';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ExposicoesService } from 'src/app/services/exposicoes.service';

@Component({
  selector: 'app-exposicao',
  templateUrl: './exposicao.component.html',
  styleUrls: ['./exposicao.component.scss']
})
export class ExposicaoComponent implements OnInit {

  exposicao: Exposicao | undefined;

  constructor(private route: ActivatedRoute,
              private exposicoesService: ExposicoesService,
              private location: Location,
              private router: Router) { }

  getExposicao(id: string): void{
    
    this.exposicoesService.getExposicao(id)
      .subscribe(exposicao => this.exposicao = exposicao);
  }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.getExposicao(id);
  }

}
