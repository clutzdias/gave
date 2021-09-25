import { Component, OnInit } from '@angular/core';
import { Exposicao } from '../interfaces/exposicao';
import { ExposicoesService } from '../services/exposicoes.service';


@Component({
  selector: 'app-exposicoes',
  templateUrl: './exposicoes.component.html',
  styleUrls: ['./exposicoes.component.scss']
})
export class ExposicoesComponent implements OnInit {

  exposicoes: Exposicao[] = [];

  constructor(private exposicoesService: ExposicoesService) { }

  private getExposicoes(): void {
    this.exposicoesService.getExposicoes()
      .subscribe(exposicoes => this.exposicoes = exposicoes);
    ;
  }

  ngOnInit(): void {
    this.getExposicoes();
  }

}
