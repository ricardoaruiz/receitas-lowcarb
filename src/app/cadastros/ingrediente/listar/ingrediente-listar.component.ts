import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Ingrediente } from '../model/ingrediente.model';
import { IngredienteServiceService } from '../service/ingrediente-service.service';

@Component({
  selector: 'app-ingrediente-listar',
  templateUrl: './ingrediente-listar.component.html',
  styleUrls: ['./ingrediente-listar.component.css'],
  providers: [ IngredienteServiceService ]
})
export class IngredienteListarComponent implements OnInit {

  // Id do ingrediente selecionado no grid de resposta da consulta.
  public idIngredienteSelecionado: number = undefined;

  // Resultado da consulta de ingredientes.
  public ingredientes: Ingrediente[] = [];

  // Mensagens de sucesso para a tela de consulta de ingredientes.
  public ingredienteConsultaMensagemSucesso: string = undefined;

  // Mensagens de erro para a tela de consulta de ingredientes.
  public ingredienteConsultaMensageErro: string = undefined;

  // Definição do formulário de consulta de ingredientes.
  public formFiltroIngrediente: FormGroup = new FormGroup({
    descricao: new FormControl(),
    ativo: new FormControl()
  });

  //Atributos para criação do modal de confirmação de exclusão de categoria.
  public atributosModalExclusao: any = {
    idModalExclusao: "modalExclusao",
    tituloModalExclusao: "Exclusão de Ingrediente",
    mensagemModalExclusao: "Deseja remover o ingrediente selecionada?"
  }  

  /**
   * Construtor da classe do componente de listagem de ingredientes.
   * 
   * @param ingredienteService - Serviço para o recurso ingrediente (injetado)
   */
  constructor(
      private ingredienteService: IngredienteServiceService
  ) { }

  ngOnInit() {
  }

  /**
   * Limpa o formulário de consulta.
   */
  public limpar(): void {
    this.formFiltroIngrediente.reset();
    this.ingredientes = [];
    this.removerErro();
    this.deselecionaIngredienteGrid();
  }

  /**
   * Faz a busca dos ingredientes baseado no filtro informado.
   */
  public buscar(): void {        
    this.ingredienteService.consultar(Ingrediente.buildFromFormGroup(this.formFiltroIngrediente))
      .subscribe(
        (ingredientes: Ingrediente[]) => {
          this.ingredientes = ingredientes;
        },
        (erro: any) => {
          this.trataRetornoConsultaComErro();
        }
      )
  }

  /**
   * Remove a mensagem de erro da tela.
   */
  public removerErro(): void {
    this.ingredienteConsultaMensageErro = undefined;
  }

  /**
   * Seleciona um ingrediente do grid de resultado da consulta.
   * 
   * @param idIngredienteSelecionado 
   */
  public selecionarIngredienteGrid(idIngredienteSelecionado: number): void {
    this.idIngredienteSelecionado = idIngredienteSelecionado;
  }

  /**
   * Remove a seleção de um item do grid de resultado da consulta.
   */
  private deselecionaIngredienteGrid(): void {
    this.idIngredienteSelecionado = undefined;
  }

  /**
   * Trata caso retorne erro da consulta de ingredientes.
   */
  private trataRetornoConsultaComErro(): void {
    this.ingredienteConsultaMensageErro = "Ocorreu um problema ao consultar os ingredientes. Tente mais tarde."    
  }
}
