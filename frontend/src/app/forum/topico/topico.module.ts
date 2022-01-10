import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicoComponent } from './topico.component';

const routes: Routes = [
  {
    path: '',
    component: TopicoComponent
  }
]

@NgModule({
  declarations: [
    TopicoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TopicoModule { }
