import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemSucessoComponent } from './mensagem-sucesso.component';

describe('MensagemSucessoComponent', () => {
  let component: MensagemSucessoComponent;
  let fixture: ComponentFixture<MensagemSucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemSucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
