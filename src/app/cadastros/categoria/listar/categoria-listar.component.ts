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

  // Formulário de consulta de categorias (ReactiveForm)
  public formFiltroCategoria = new FormGroup({
    descricao : new FormControl(),
    ativo: new FormControl('')
  })

  // Resultado da consulta de categrias em função do filtro informado.
  public categorias: Categoria[];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    
  }

  /**
   * Realiza a consulta das categorias em função do filtro informado
   */
  public buscar(): void {
    this.categoriaService.consultar(this.getCategoriaFiltro())
      .subscribe( (categorias: Array<Categoria>) => {
        this.categorias = categorias;
      })
  }

  /**
   * Limpa os dados da consulta (filtro e resultado)
   */
  public limpar(): void {
    this.formFiltroCategoria.reset();
    this.categorias = [];
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

}
