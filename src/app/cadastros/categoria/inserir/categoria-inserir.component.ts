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

  public categoriaInserida: Categoria = undefined;
  public categoriaInseridaMensagemSucesso: string = undefined;
  public categoriaInseridaMensageErro: string = undefined;

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
            this.categoriaInserida = categoria
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
    this.categoriaInseridaMensageErro = undefined;
  }

  private getCategoriaFromForm(): Categoria {
    return new Categoria(
      0,
      this.formInserirCategoria.controls['descricao'].value,
      this.formInserirCategoria.controls['ativo'].value
    )
  }

  private inclusaoComSucesso(): void {
    this.categoriaInseridaMensagemSucesso = `A categoria "${this.categoriaInserida.descricao}" foi criada com sucesso`;
    setTimeout( () => {
      this.categoriaInserida = undefined;
      this.categoriaInseridaMensagemSucesso = undefined;
    }, 3000)
  }

  private inclusaoComErro(): void {
    this.categoriaInseridaMensageErro = "Ocorreu um erro ao inserir a categoria. Tente mais tarde.";
  }


}
