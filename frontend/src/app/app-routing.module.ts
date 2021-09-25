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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
