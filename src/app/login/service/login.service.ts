import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as firebase from 'firebase';

import { Usuario } from '../model/usuario.model';


@Injectable()
export class LoginService {

  constructor() { }

  public login(usuario: Usuario): Observable<void> {
    
    return new Observable<void>( (observer: Observer<any>) => {

      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)
      .then( (resposta) => {
        console.log('sucesso login', resposta);
        observer.next(true);
      })
      .catch( erro => {
        console.log('erro login', erro);
        observer.error(erro);
      })

    })    

  }

  public logoff(): Observable<void> {
    return new Observable<void>( (observer: Observer<any>) => {
      firebase.auth().signOut()
        .then( () => {
          observer.next(true);
        })
        .catch( erro => {
          observer.error(erro);
        })
      
    })
  }

}
