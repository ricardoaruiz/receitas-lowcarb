import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';

import { Ingrediente } from '../model/ingrediente.model';

@Injectable()
export class IngredienteServiceService {

  // URL base para o recurso ingrediente
  private categoriaBaseUrl: string = `${environment.apiBaseUrl}/ingrediente`;

  //Header para chamadas http que necessitem de bdy (POST, PUT, PATCH)
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  /**
   * Construtor do serviço.
   * 
   * @param http Cliente Http para realizar as requisições.
   */
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Consulta os dados da API levando em consideração a 
   * implementação do JSON-SERVER.
   *
   * @param ingredienteFiltro 
   * @returns Observable<Ingrediente[]>
   */
  public consultar(ingredienteFiltro: Ingrediente): Observable<Ingrediente[]> {

    let url = this.categoriaBaseUrl;

    let temDescricao: boolean = false;
    if (ingredienteFiltro.descricao) {
      url = `${url}?descricao_like=${ingredienteFiltro.descricao}`;
      temDescricao = true;
    }
    if (ingredienteFiltro.ativo) {
      if (temDescricao) {
        url = `${url}&ativo=${ingredienteFiltro.ativo}`;
      } else {
        url = `${url}?ativo=${ingredienteFiltro.ativo}`;
      }
    }

    return this.http.get<Array<Ingrediente>>(url);
  }  

}
