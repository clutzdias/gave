import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { ExposicaoComponent } from '../exposicao/exposicao.component';
import { HomeComponent } from './home.component';

const routes: Routes = []

@NgModule({
  declarations: [
    HomeComponent,
    ExposicaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})

export class HomeModule { }
