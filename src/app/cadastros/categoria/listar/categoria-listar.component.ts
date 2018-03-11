import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import { Categoria } from '../model/categoria.model';
import { CategoriaService }  from '../service/categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css'],
  providers: [ CategoriaService ]
})
export class CategoriaListarComponent implements OnInit {

  // Mensagem de erro caso ocorra problema na tela de consulta de categorias.
  public categoriaConsultaMensageErro: string = undefined;

  // Mensagem de sucesso para operações da tela de consulta de categorias.
  public categoriaConsultaMensagemSucesso: string = undefined;

  // Formulário de consulta de categorias (ReactiveForm)
  public formFiltroCategoria = new FormGroup({
    descricao : new FormControl(),
    ativo: new FormControl('')
  })

  // Resultado da consulta de categrias em função do filtro informado.
  public categorias: Categoria[];

  //Id da categoria selecionada no grid de resultado da consulta
  public categoriaId: number = undefined;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    
  }

  /**
   * Realiza a consulta das categorias em função do filtro informado
   */
  public buscar(): void {
    this.removerErro();
    this.categoriaService.consultar(this.getCategoriaFiltro())
      .subscribe( 
        (categorias: Array<Categoria>) => {
          this.categorias = categorias;
        },
        (erro: any) => {          
          this.categoriaConsultaMensageErro = 'Ocorreu um erro ao consultar as categorias. Tente mais tarde.'          
        }
      )
  }

  /**
   * Limpa os dados da consulta (filtro e resultado)
   */
  public limpar(): void {
    this.categorias = [];
    this.categoriaId = undefined;
    this.formFiltroCategoria.reset();
    this.removeSucesso();
    this.removerErro();
  }

  /**
   * Ao fechar a mensagem de erro esse método é disparado para limpar
   * a mensagem na variável do componente.
   */
  public removerErro(): void {
    if(this.categoriaConsultaMensageErro != undefined) {
      this.categoriaConsultaMensageErro = undefined;
    }
  }

  public removeSucesso(): void {
    this.categoriaConsultaMensagemSucesso = undefined;
  }

  public selecionarCategoriaGrid(categoriaId: number): void {
    this.categoriaId = categoriaId;    
  }

  public excluir(): void {
    this.categoriaService.excluir(this.categoriaId)
      .subscribe( 
        (categoria: Categoria) => {
          this.exclusaoCategoriaSucesso();
        },
        (error: any) => {
          this.categoriaConsultaMensageErro = 'Problema ao remover a categoria selecionada. Tente mais tarde.';
        }
    )
    console.log(this.categoriaId);    
  }

  /**
   * Monta um objeto categoria a partir do formulário de consulta recebido.
   */
  private getCategoriaFiltro(): Categoria {
    return new Categoria(
      0,
      this.formFiltroCategoria.value.descricao,
      this.formFiltroCategoria.value.ativo
    )
  }

  private exclusaoCategoriaSucesso(): void {
    this.categoriaConsultaMensagemSucesso = 'A categoria foi removida com sucesso';
    this.buscar();
    setTimeout(() => {
      this.removeSucesso();
    }, 3000);
  }

}
