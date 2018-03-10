import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListarComponent } from './categoria-listar.component';
import { CategoriaService }  from '../service/categoria.service';

describe('CategoriaListarComponent', () => {
  let component: CategoriaListarComponent;
  let fixture: ComponentFixture<CategoriaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaListarComponent ],
      providers: [ CategoriaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
