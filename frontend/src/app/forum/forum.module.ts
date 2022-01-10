import { ForumService } from './../services/forum.service';
import { ForumComponent } from './forum.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicoComponent } from './topico/topico.component';
import { FormTopicoComponent } from './form-topico/form-topico.component';
import { Routes, RouterModule } from '@angular/router';
import { TopicoModule } from './topico/topico.module';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent
  },
  {
    path: 'topico',
    loadChildren: () => import('./topico/topico.module').then(m => TopicoModule)
  },
  {
    path: 'topico/:id',
    loadChildren: () => import('./topico/topico.module').then(m => TopicoModule)
  }

]

@NgModule({
  declarations: [
    ForumComponent,
    FormTopicoComponent
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
