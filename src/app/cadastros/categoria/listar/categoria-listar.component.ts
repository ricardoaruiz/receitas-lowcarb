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

  //Atributos para criação do modal de confirmação de exclusão de categoria.
  public atributosModalExclusao: any = {
    idModalExclusao: "modalExclusao",
    tituloModalExclusao: "Exclusão de Categoria",
    mensagemModalExclusao: "Deseja remover a categoria selecionada?"
  }

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    
  }

  /**
   * Realiza a consulta das categorias em função do filtro informado
   */
  public buscar(): void {
    this.removeSelecaoCategoriaGrid();
    this.removerErro();
    this.categoriaService.consultar(Categoria.buildFromFromGroup(this.formFiltroCategoria))
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
    this.removeSelecaoCategoriaGrid();
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

  /**
   * Remove a mensagem de sucesso de remoção de categoria
   */
  public removeSucesso(): void {
    this.categoriaConsultaMensagemSucesso = undefined;
  }

  /**
   * Executado sempre que o radio button de uma linha do grid
   * de resultado da consulta for clicado
   * @param categoriaId 
   */
  public selecionarCategoriaGrid(categoriaId: number): void {
    this.categoriaId = categoriaId;    
  }

  /**
   * Executado no botão de confirmar do modal de confirmação 
   * de exclusão de categoria
   */
  public excluir(): void {
    this.categoriaService.excluir(this.categoriaId)
      .subscribe( 
        () => {
          this.exclusaoCategoriaSucesso();
        },
        (error: any) => {
          this.categoriaConsultaMensageErro = 'Problema ao remover a categoria selecionada. Tente mais tarde.';
        }
    )
    console.log(this.categoriaId);    
  }

  /**
   * Executado sempre após a chamada do serviço de remoção de categoria
   * para refazer a consulta e limpar a mensagem de sucesso.
   */
  private exclusaoCategoriaSucesso(): void {
    this.categoriaConsultaMensagemSucesso = 'A categoria foi removida com sucesso';
    this.buscar();
    setTimeout(() => {
      this.removeSucesso();
    }, 3000);
  }

  /**
   * Limpa o atributo que indica qual linha do grid está selecionado.
   */
  private removeSelecaoCategoriaGrid(): void {
    this.categoriaId = undefined;
  }

}
