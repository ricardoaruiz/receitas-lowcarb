import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as firebase from 'firebase';

import { Categoria } from '../model/categoria.model';

import { environment } from '../../../../environments/environment';

@Injectable()
export class CategoriaService {

  // URL base para o recurso categoria
  private categoriaBaseUrl: string = `${environment.apiBaseUrl}/categoria`;

  /**
   * Construtor da classe.
   */
  constructor() { }

  /**
   * Chama a API para buscar uma categoria em função de seu id.
   * 
   * @param id 
   */
  public buscarPorId(id: number): Observable<Categoria> {

    return new Observable<Categoria>( (observer: Observer<any>) => {

      firebase.database()
        .ref('categoria')
        .orderByChild('id')
        .equalTo(id)
        .once('value',
          (resultado: firebase.database.DataSnapshot) => {
            
            resultado.forEach(categoria => {
              let c = new Categoria(
                categoria.val().id,
                categoria.val().descricao,
                categoria.val().ativo,
                categoria.key
              )
              observer.next(c)
              return false;
            })

          },
          (error) => {
            observer.error(error);
          }
        )
    })
  }

  /**
   * Consulta os dados de categoria.
   * 
   * @param categoriaFiltro 
   * @returns Observable<Categoria[]>
   */
  public consultar(categoriaFiltro: Categoria): Observable<Array<Categoria>> {

    return new Observable<Categoria[]>( (observer: Observer<any>) => {
      
        firebase.database().ref('categoria')
          .on('value', 
            (snapShot: firebase.database.DataSnapshot) => {
              
              let categorias: Categoria[] = [];

              snapShot.forEach( (categoria: firebase.database.DataSnapshot) => {
                categorias.push(new Categoria(
                                      categoria.val().id, 
                                      categoria.val().descricao, 
                                      categoria.val().ativo)
                                    )
                return false;
              })  

              //Aplica os filtros da consulta
              categorias = this.aplicaFiltroConsulta(categorias, categoriaFiltro);

              observer.next(categorias);
            },
            (error) => {
              observer.error(error);
            }
          )
        })
  }

  /**
   * Chama a API para criar uma nova categoria.
   * 
   * @param categoria 
   */
  public inserir(categoria: Categoria): Observable<Categoria> {    
    delete categoria.key;
    return new Observable( (observer: Observer<Categoria>) => {      
      let referencia = firebase.database().ref(`categoria`)
        .push(categoria,
          (error) => {
            if(error) {
              observer.error(error);
            } else {
              observer.next(categoria);
            }
          }
        )
    });
  }

  /**
   * Chama a API para alterar uma categoria.
   * 
   * @param categoria 
   */
  public alterar(categoria: Categoria): Observable<Categoria> {
    
    return new Observable<Categoria>( (observer: Observer<Categoria>) => {
      let key = categoria.key;
      delete categoria.key;
      firebase.database().ref(`categoria/${key}`).set(categoria, 
        (error) => {
          if(error) {
            observer.error(error);
          } else {
            observer.next(categoria);
          }
        }
      )
    });

  }

  /**
   * Chama a API para remover uma categoria.
   * 
   * @param categoriaId 
   */
  public excluir(categoriaId: number): Observable<void> {

    return new Observable<void>( (observer: Observer<any>) => {
      this.buscarPorId(categoriaId)
        .subscribe(
          (categoria: Categoria) => {
            firebase.database().ref(`categoria/${categoria.key}`).remove(
              (error) => {
                if(error) {
                  observer.error(error);
                } else {
                  observer.next(true);
                }
              }
            )
          }
        )
    });

  }

  /**
   * Aplica os filtros da consulta no array com as categorias retornadas
   * @param categorias 
   * @param categoriaFiltro 
   */
  private aplicaFiltroConsulta(categorias: Categoria[], categoriaFiltro: Categoria): Categoria[] {

    //Filtro quando nenhum campo da pesquisa é informado
    if (this.isBlankOrNull(categoriaFiltro.descricao) && 
          this.isBlankOrNull(categoriaFiltro.ativo)) {

      return categorias;

    } else {
      return categorias.filter( (categoria: Categoria) => {

        //Filtro quando somente a descrição é informada
        if (categoriaFiltro.descricao && this.isBlankOrNull(categoriaFiltro.ativo)) {
          return categoria.descricao.toLowerCase().includes(categoriaFiltro.descricao);
        }

        //Filtro quando somente ativo é informado
        if (this.isBlankOrNull(categoriaFiltro.descricao) && categoriaFiltro.ativo) {
          return categoria.ativo === categoriaFiltro.ativo;
        }

        //Filtro quando descrição e ativo são informados
        if (categoriaFiltro.descricao && categoriaFiltro.ativo) {
          return categoria.descricao.toLowerCase()
            .includes(categoriaFiltro.descricao.toLowerCase()) &&
              categoria.ativo === categoriaFiltro.ativo;
        }
      })
    }

  }

  /**
   * Verifica se um valor é nulo, undefined ou vazio (string)
   * @param valor
   */
  private isBlankOrNull(valor: any | string) {
    if (typeof valor === 'string') {
      return valor == null || valor === undefined || valor === '';
    } else {
      return valor == null || valor === undefined;
    }
  }

}
