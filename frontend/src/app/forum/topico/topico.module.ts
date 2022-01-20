import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TopicoModule { }
