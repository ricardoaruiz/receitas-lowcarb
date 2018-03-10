import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriaInserirComponent } from './cadastros/categoria/inserir/categoria-inserir.component';
import { CategoriaListarComponent } from './cadastros/categoria/listar/categoria-listar.component';
import { CategoriaAlterarComponent } from './cadastros/categoria/alterar/categoria-alterar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cadastro/categoria',
    component: CategoriaListarComponent
  },
  {
    path: 'cadastro/categoria/novo',
    component: CategoriaInserirComponent
  },
  {
    path: 'cadastro/categoria/alterar/:id',
    component: CategoriaAlterarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
