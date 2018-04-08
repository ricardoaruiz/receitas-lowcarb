import { Component, OnInit } from '@angular/core';
import { 
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loading = true;

  public usuarioLogado = false;

  public title = 'app';

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAuL3QuZiOPf78X6G9smEJfCE923onjcsg",
      authDomain: "rar-receitas-lowcarb.firebaseapp.com",
      databaseURL: "https://rar-receitas-lowcarb.firebaseio.com",
      projectId: "rar-receitas-lowcarb",
      storageBucket: "rar-receitas-lowcarb.appspot.com",
      messagingSenderId: "192400884210"
    };
    firebase.initializeApp(config);
  }

  // Mostra e esconde o loader para navegação nas rotas
  public navigationInterceptor(event: RouterEvent): void {
    this.verificaUsuarioLogado();
    if (event instanceof NavigationStart) {
      this.loading = true    
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false
      }, 200);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }

  private verificaUsuarioLogado(): void {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if(user !== undefined && user != null) {
        this.usuarioLogado = true;
      } else {
        this.usuarioLogado = false;
      }
    });
        
  }

}
