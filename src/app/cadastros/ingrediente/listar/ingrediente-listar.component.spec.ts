import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteListarComponent } from './ingrediente-listar.component';

describe('IngredienteListarComponent', () => {
  let component: IngredienteListarComponent;
  let fixture: ComponentFixture<IngredienteListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredienteListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
