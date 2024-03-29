import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ExposicoesService } from '../services/exposicoes.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'exposicao',
        loadChildren: () => import('../exposicoes/exposicao/exposicao.module').then(m => m.ExposicaoModule)
    },
    {
        path: 'exposicao/:id',
        loadChildren: () => import('../exposicoes/exposicao/exposicao.module').then(m => m.ExposicaoModule)
    },
    {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
    }
     
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        ExposicoesService
    ]
})
export class HomeModule {}
