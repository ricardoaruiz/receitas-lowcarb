import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mensagem-feedback',
  templateUrl: './mensagem-feedback.component.html',
  styleUrls: ['./mensagem-feedback.component.css']
})
export class MensagemFeedbackComponent implements OnInit {

  @Input()
  public mensagemSucesso: string = undefined;

  @Input()
  public mensagemErro: string = undefined;

  @Output()
  public fecharErro: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    
  }

  public removerErro() {   
    this.fecharErro.emit();
  }

}
