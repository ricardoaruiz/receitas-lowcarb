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

  /**
   * Definição do formulário de criação de categoria.
   */
  public formInserirCategoria: FormGroup = new FormGroup({
    descricao: new FormControl('', Validators.required),
    ativo: new FormControl('S')
  });

  // Guarda a categoria inserida.
  public categoriaInserida: Categoria = undefined;

  // Mensagem de sucesso quando uma categoria é inserida.
  public categoriaInseridaMensagemSucesso: string = undefined;

  // Mensagem de erro quando uma categoria é inserida.
  public categoriaInseridaMensageErro: string = undefined;

  /**
   * Construtor da classe do componente.
   * 
   * @param categoriaService CategoriaService que é injetada pelo Angular.
   */
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  /**
   * Método que insere uma categoria.
   */
  public confirmar(): void {
    if(this.formInserirCategoria.invalid) {
      Object.keys(this.formInserirCategoria.controls).forEach(key => {
        this.formInserirCategoria.get(key).markAsTouched();
      });
      return;
    }

    this.categoriaService.inserir(Categoria.buildFromFromGroup(this.formInserirCategoria))
      .subscribe( 
        (categoria: Categoria) => 
          {
            this.categoriaInserida = categoria
            this.limpar();
            this.trataInclusaoComSucesso(categoria);
          },
        (erro: any) => 
          {
            console.log(erro);
            this.trataInclusaoComErro();
          }
      )

  }

  /**
   * Limpa os dados do formulário.
   */
  public limpar(): void {
    this.formInserirCategoria.reset();
    this.formInserirCategoria.controls['ativo'].setValue('S');
  }

  /**
   * Remove a mensagem de erro da tela.
   */
  public removerErro(): void {
    this.categoriaInseridaMensageErro = undefined;
  }

  /**
   * Trata o retorno da criação de uma categoria com sucesso.
   */
  private trataInclusaoComSucesso(categoria: Categoria): void {
    this.categoriaInseridaMensagemSucesso = `A categoria "${categoria.descricao}" foi criada com sucesso`;
    setTimeout( () => {
      this.categoriaInserida = undefined;
      this.categoriaInseridaMensagemSucesso = undefined;
    }, 3000)
  }

  /**
   * Trata o erro na tentativa de criar uma categoria.
   */
  private trataInclusaoComErro(): void {
    this.categoriaInseridaMensageErro = "Ocorreu um erro ao inserir a categoria. Tente mais tarde.";
  }


}
