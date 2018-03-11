import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {

  @Input()
  public idModal: string;

  @Input()
  public titulo: string;

  public labelledby: string;

  @Input()
  public mensagem: string;

  @Output()
  public acaoConfirmar: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.labelledby = this.idModal + 'Label';
  }

  public confirmar(): void {
    this.acaoConfirmar.emit();
  }

}
