import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Categoria } from '../model/categoria.model';

import { environment } from '../../../../environments/environment';

@Injectable()
export class CategoriaService {

  //Dados mockados internamente na classe de serviço
  private categoriasMock: Categoria[] = [
    new Categoria(1,'MOCK_INTERNA', 'S'),
    new Categoria(2,'AAAAAA', 'S'),
    new Categoria(3,'BBABBB', 'N'),
    new Categoria(4,'CCCCCC', 'S'),
    new Categoria(5,'DDCDDD', 'N'),
  ]

  // URL base para o recurso categoria
  private categoriaBaseUrl: string = `${environment.apiBaseUrl}/categoria`;

  //Header para chamadas http que necessitem de bdy (POST, PUT, PATCH)
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.categoriaBaseUrl}?id=${id}`);
  }

  /**
   * Consulta os dados de categoria
   * 
   * @param categoriaFiltro 
   * @returns Observable<Categoria[]>
   */
  public consultar(categoriaFiltro: Categoria): Observable<Array<Categoria>> {
    let retorno: Observable<Array<Categoria>>;
    if(environment.useApi) {
      retorno = this.consultaApi(categoriaFiltro);
    } else {
      retorno = this.consultaMock(categoriaFiltro);
    }
    return retorno;
  }

  public inserir(categoria: Categoria): Observable<Categoria> {    
    return this.http.post<Categoria>(this.categoriaBaseUrl, categoria, this.httpOptions);
  }

  public alterar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.categoriaBaseUrl}/${categoria.id}`, categoria, this.httpOptions );
  }

  public excluir(categoriaId: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.categoriaBaseUrl}/${categoriaId}`, this.httpOptions);
  }

  /**
   * Consulta os dados da API levando em consideração a implementação do JSON-SERVER
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

  /**
   * Consulta os dados que estão mockados aqui dentro da classe de serviço
   * 
   * @param categoriaFiltro 
   * @returns Observable<Categoria[]>
   */
  private consultaMock(categoriaFiltro: Categoria): Observable<Categoria[]> {
    let categoriasFiltrada = 
      this.categoriasMock.filter( (categoria: Categoria) => {

        let filtroPorDescricao: boolean = true;
        if(categoriaFiltro.descricao) {
          filtroPorDescricao = categoria.descricao.toUpperCase().includes(categoriaFiltro.descricao.toUpperCase()) 
            ? true : false;
        }

        let filtroPorAtivo: boolean = true;
        if(categoriaFiltro.ativo) {
          filtroPorAtivo = categoriaFiltro.ativo === categoria.ativo ? true : false;
        }
        return filtroPorDescricao && filtroPorAtivo;
      })    

      return new Observable<Array<Categoria>>( (observer) => {
        observer.next(categoriasFiltrada);
      });
  }

}
