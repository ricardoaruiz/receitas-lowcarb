import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//Layout
import { MenuComponent } from './layout/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './layout/rodape/rodape.component';
import { MensagemFeedbackComponent } from './layout/mensagem-feedback/mensagem-feedback.component';
import { ModalConfirmacaoComponent } from './layout/modal-confirmacao/modal-confirmacao.component';

//Categoria
import { CategoriaInserirComponent } from './cadastros/categoria/inserir/categoria-inserir.component';
import { CategoriaListarComponent } from './cadastros/categoria/listar/categoria-listar.component';
import { CategoriaAlterarComponent } from './cadastros/categoria/alterar/categoria-alterar.component';

//Ingrediente
import { IngredienteListarComponent } from './cadastros/ingrediente/listar/ingrediente-listar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    HomeComponent,
    CategoriaInserirComponent,
    CategoriaListarComponent,
    MensagemFeedbackComponent,
    CategoriaAlterarComponent,
    ModalConfirmacaoComponent,
    IngredienteListarComponent
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
