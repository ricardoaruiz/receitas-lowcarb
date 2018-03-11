import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Categoria } from '../model/categoria.model';

import { environment } from '../../../../environments/environment';

@Injectable()
export class CategoriaService {

  // URL base para o recurso categoria
  private categoriaBaseUrl: string = `${environment.apiBaseUrl}/categoria`;

  //Header para chamadas http que necessitem de bdy (POST, PUT, PATCH)
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  /**
   * Construtor da classe.
   * 
   * @param http Http injetado pelo Angular.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Chama a API para buscar uma categoria em função de seu id.
   * 
   * @param id 
   */
  public buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.categoriaBaseUrl}?id=${id}`);
  }

  /**
   * Consulta os dados de categoria.
   * 
   * @param categoriaFiltro 
   * @returns Observable<Categoria[]>
   */
  public consultar(categoriaFiltro: Categoria): Observable<Array<Categoria>> {
    return this.consultaApi(categoriaFiltro);    
  }

  /**
   * Chama a API para criar uma nova categoria.
   * 
   * @param categoria 
   */
  public inserir(categoria: Categoria): Observable<Categoria> {    
    return this.http.post<Categoria>(this.categoriaBaseUrl, categoria, this.httpOptions);
  }

  /**
   * Chama a API para alterar uma categoria.
   * 
   * @param categoria 
   */
  public alterar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.categoriaBaseUrl}/${categoria.id}`, categoria, this.httpOptions );
  }

  /**
   * Chama a API para remover uma categoria.
   * 
   * @param categoriaId 
   */
  public excluir(categoriaId: number): Observable<void> {
    return this.http.delete<void>(`${this.categoriaBaseUrl}/${categoriaId}`, this.httpOptions);
  }

  /**
   * Consulta os dados da API levando em consideração a 
   * implementação do JSON-SERVER.
   *
   * @param categoriaFiltro 
   * @returns Observable<Categoria[]>
   */
  private consultaApi(categoriaFiltro: Categoria): Observable<Categoria[]> {

    let url = this.categoriaBaseUrl;

    let temDescricao: boolean = false;
    if (categoriaFiltro.descricao) {
      url = `${url}?descricao_like=${categoriaFiltro.descricao}`;
      temDescricao = true;
    }
    if (categoriaFiltro.ativo) {
      if (temDescricao) {
        url = `${url}&ativo=${categoriaFiltro.ativo}`;
      } else {
        url = `${url}?ativo=${categoriaFiltro.ativo}`;
      }
    }

    return this.http.get<Array<Categoria>>(url);
  }

}
