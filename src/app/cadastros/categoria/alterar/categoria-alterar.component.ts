import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria-alterar',
  templateUrl: './categoria-alterar.component.html',
  styleUrls: ['./categoria-alterar.component.css'],
  providers: [ CategoriaService ]
})
export class CategoriaAlterarComponent implements OnInit {

  /**
  * Definição do formulário de alteração de categoria.
  */
  public formAlterarCategoria: FormGroup = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl('',Validators.required),
    ativo: new FormControl()
  })

  // Mensagem de sucesso quando uma categoria é alterada.
  public categoriaAlteradaMensagemSucesso: string = undefined;

  // Mensagem de erro quando uma categoria é alterada.
  public categoriaAlteradaMensageErro: string = undefined;

   /**
   * Construtor da classe do componente.
   * 
   * @param activatedRoute ActivatedRoute injetada pelo Angular (usado para obter
   *                       os parâtros da rota)
   * @param router Router injetada pelo Angular (usado para fazer uma navegação para
   *               outra rota)
   * @param categoriaService CategoriaService que é injetada pelo Angular.
   */
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private categoriaServico: CategoriaService
    ) { }

  /**
   * Pega o parametro de id recebido na rota e chama o serviço para a consulta
   * de uma categoria, em seguida popula o formulário com o resultado dessa
   * pesquisa.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.categoriaServico.buscarPorId(params.id)
        .subscribe( (categoria: Categoria) => {
          this.preencheFormulario(categoria[0]);
      })
    })
  }

  /**
   * Confirma a alteração de um categoria
   */
  public confirmar(): void {
    this.categoriaServico.alterar(Categoria.buildFromFromGroup(this.formAlterarCategoria))
      .subscribe( 
        (categoria: Categoria) => {
          this.trataAlteracaoSucesso(categoria);
          //this.router.navigate(['/cadastro/categoria']);
        },
        (erro: any) => {
          console.log('Erro', erro);
          this.categoriaAlteradaMensageErro = 'Erro ao alterar a categoria. Tente mais tarde.';
        }
    )      
  }

  /**
   * Remove a mensagem de erro da tela.
   */
  public removerErro(): void {
    this.categoriaAlteradaMensageErro = undefined;
  }

  /**
   * Trata o resultado de uma alteração com sucesso.
   */
  public trataAlteracaoSucesso(categoria: Categoria): void {
    this.categoriaAlteradaMensagemSucesso = `Categoria "${categoria.descricao}" alterada com sucesso`;
    setTimeout(() => {
      this.categoriaAlteradaMensagemSucesso = undefined;
    }, 3000);
  }

  /**
   * Varre todos os campos do formulário e seta os valores vindos 
   * da consulta realizada.
   * 
   * @param categoria 
   */
  private preencheFormulario(categoria: Categoria): void {
    Object.keys(this.formAlterarCategoria.controls).forEach(key => {
      if(this.formAlterarCategoria.get(key)) {
        this.formAlterarCategoria.get(key).setValue(categoria[key]);
      }
    });
  }
}
