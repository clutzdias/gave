import { ForumService } from './../services/forum.service';
import { ForumComponent } from './forum.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent
  },
  {
    path: 'topico',
    loadChildren: () => import('./topico/topico.module').then(m => m.TopicoModule)
  },
  {
    path: 'topico/:id',
    loadChildren: () => import('./topico/topico.module').then(m => m.TopicoModule)
  },
  {
    path: 'criartopico',
    loadChildren: () => import('./form-topico/form-topico.module').then(m => m.FormTopicoModule)
  }

]

@NgModule({
  declarations: [
    ForumComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ForumService
  ]
})
export class ForumModule { }
