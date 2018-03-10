import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaInserirComponent } from './categoria-inserir.component';
import { CategoriaService } from '../service/categoria.service';

describe('CategoriaInserirComponent', () => {
  let component: CategoriaInserirComponent;
  let fixture: ComponentFixture<CategoriaInserirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaInserirComponent ],
      providers: [ CategoriaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
