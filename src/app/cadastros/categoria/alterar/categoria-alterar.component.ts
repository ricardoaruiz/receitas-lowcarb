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

  public formAlterarCategoria: FormGroup = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl('',Validators.required),
    ativo: new FormControl()
  })

  public categoriaAlteradaMensagemSucesso: string = undefined;
  public categoriaAlteradaMensageErro: string = undefined;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private categoriaServico: CategoriaService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.categoriaServico.buscarPorId(params.id)
        .subscribe( (categoria: Categoria) => {
          let categoriaEncontrada: Categoria = categoria[0];  

          //Varre todos os campos do formulário e seta os valores vindos da consulta realizada
          Object.keys(this.formAlterarCategoria.controls).forEach(key => {
            this.formAlterarCategoria.get(key).setValue(categoriaEncontrada[key]);
          });
      })
    })
  }

  public confirmar(): void {
    this.categoriaServico.alterar(this.getCategoriaFromForm())
      .subscribe( 
        (categoria: Categoria) => {
          this.trataAlteracaoSucesso();
          //this.router.navigate(['/cadastro/categoria']);
        },
        (erro: any) => {
          console.log('Erro', erro);
          this.categoriaAlteradaMensageErro = 'Erro ao alterar a categoria. Tente mais tarde.';
        }
    )      
  }

  public removerErro(): void {
    this.categoriaAlteradaMensageErro = undefined;
  }

  public trataAlteracaoSucesso(): void {
    this.categoriaAlteradaMensagemSucesso = 'Categoria alterada com sucesso';
    setTimeout(() => {
      this.categoriaAlteradaMensagemSucesso = undefined;
    }, 3000);
  }

  private getCategoriaFromForm(): Categoria {
    return new Categoria(
      this.formAlterarCategoria.controls['id'].value,
      this.formAlterarCategoria.controls['descricao'].value,
      this.formAlterarCategoria.controls['ativo'].value
    )
  }

}
