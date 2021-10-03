import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { 
    path: 'exposicoes', 
    loadChildren: () => import ('./exposicoes/exposicoes.module').then(m => m.ExposicoesModule)
  },
  {
    path: 'exposicao',
    loadChildren: () => import('./exposicoes/exposicao/exposicao.module').then(m => m.ExposicaoModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'areausuario',
    loadChildren: () => import('./paginausuario/paginausuario.module').then(m => m.PaginaUsuarioModule)
  },
  {
    path: 'trabalhoedit',
    loadChildren: () => import('./paginausuario/form-trabalho/form-trabalho.module').then(m => m.FormTrabalhoModule)
  },
  {
    path: 'forum',
    loadChildren: () => import('./topicos/topicos.module').then(m => m.TopicosModule)
  },
  {
    path: 'topico',
    loadChildren: () => import('./topicos/topico/topico.module').then(m => m.TopicoModule)
  }, 
  {
    path: 'criartopico',
    loadChildren: () => import('./topicos/form-topico/form-topico.module').then(m => m.FormTopicoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
