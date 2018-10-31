import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Coracao } from '../shared/coracao.model'
import { CORACOES } from '../shared/coracoes-mock'

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})

export class TentativasComponent implements OnInit, OnChanges {
  public coracoes: Coracao[] = CORACOES
  @Input() public tentativas: number

  constructor() {
    this.coracoes
  }

  ngOnChanges() {
    if (this.tentativas !== this.coracoes.length) {
      let indice = (this.coracoes.length - this.tentativas) - 1
      this.coracoes[indice].cheio = false
    }
  }

  ngOnInit() {
  }
}
