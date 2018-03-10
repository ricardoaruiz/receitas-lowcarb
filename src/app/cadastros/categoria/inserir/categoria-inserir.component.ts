import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria-inserir',
  templateUrl: './categoria-inserir.component.html',
  styleUrls: ['./categoria-inserir.component.css'],
  providers: [ CategoriaService ]
})
export class CategoriaInserirComponent implements OnInit {

  public formInserirCategoria: FormGroup = new FormGroup({
    descricao: new FormControl('', Validators.required),
    ativo: new FormControl('S')
  });

  public categoriaInseridaSucesso: Categoria = undefined;
  public categoriaInseridaErro: boolean = false;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  public confirmar(): void {
    if(this.formInserirCategoria.invalid) {
      Object.keys(this.formInserirCategoria.controls).forEach(key => {
        this.formInserirCategoria.get(key).markAsTouched();
      });
      return;
    }

    this.categoriaService.inserir(this.getCategoriaFromForm())
      .subscribe( 
        (categoria: Categoria) => 
          {
            this.categoriaInseridaSucesso = categoria
            this.limpar();
            this.inclusaoComSucesso();
          },
        (erro: any) => 
          {
            console.log(erro);
            this.inclusaoComErro();
          }
      )

  }

  public limpar(): void {
    this.formInserirCategoria.reset();
    this.formInserirCategoria.controls['ativo'].setValue('S');
  }

  public removerErro(): void {
    this.categoriaInseridaErro = false;
  }

  private getCategoriaFromForm(): Categoria {
    return new Categoria(
      0,
      this.formInserirCategoria.controls['descricao'].value,
      this.formInserirCategoria.controls['ativo'].value
    )
  }

  private inclusaoComSucesso(): void {
    setTimeout( () => {
      this.categoriaInseridaSucesso = undefined;
    }, 3000)
  }

  private inclusaoComErro(): void {
    this.categoriaInseridaErro = true;
  }


}
