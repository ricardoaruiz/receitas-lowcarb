import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
import { RodapeComponent } from './layout/rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { CategoriaInserirComponent } from './cadastros/categoria/inserir/categoria-inserir.component';
import { CategoriaListarComponent } from './cadastros/categoria/listar/categoria-listar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    HomeComponent,
    CategoriaInserirComponent,
    CategoriaListarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
