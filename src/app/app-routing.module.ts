import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriaInserirComponent } from './cadastros/categoria/inserir/categoria-inserir.component';
import { CategoriaListarComponent } from './cadastros/categoria/listar/categoria-listar.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
