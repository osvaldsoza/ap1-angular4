import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from '../shared/frases-mock'
import { Coracao } from '../shared/coracao.model'
import { CORACOES } from '../shared/coracoes-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string
  public rodada: number = 0
  public rodadaFrase: Frase
  public painelProgresso: number = 0
  public coracoes: Coracao[] = CORACOES
  public tentativas: number = this.coracoes.length
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  // ngOnDestroy(){
  //   console.log('Componente painel destruído')
  // }
  atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  verificaResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {
      this.rodada++
      this.painelProgresso += (100 / this.frases.length)

      if (this.rodada === this.frases.length) {
        this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada()
    } else {
      this.tentativas--
      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
        this.tentativas = this.coracoes.length
        this.atualizaRodada()
      }
    }
  }

  private atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}
