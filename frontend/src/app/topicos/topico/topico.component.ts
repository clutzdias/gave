import { Component, OnInit } from '@angular/core';
import { Topico } from 'src/app/interfaces/topico';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.component.html',
  styleUrls: ['./topico.component.scss']
})
export class TopicoComponent implements OnInit {

  public topico: Topico = {} as Topico;

  constructor() { }

  ngOnInit(): void {
  }

}
