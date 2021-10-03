import { Component, Input, OnInit } from '@angular/core';
import { Mensagem } from '../interfaces/mensagem';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss']
})
export class MensagensComponent implements OnInit {

  @Input() mensagens?: Mensagem[]; 

  constructor() { }

  ngOnInit(): void {
  }

}
