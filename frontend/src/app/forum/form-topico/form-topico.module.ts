import { ForumService } from './../../services/forum.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTopicoComponent } from './form-topico.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path: '',
      component: FormTopicoComponent
  }
];

@NgModule({
  declarations: [
    FormTopicoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [
    ForumService
  ]
})
export class FormTopicoModule { }
