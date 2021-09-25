import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ExposicoesComponent } from './exposicoes.component';
import { ExposicoesService } from '../services/exposicoes.service';

const routes: Routes = [
    {
        path: '',
        component: ExposicoesComponent
    },
    {
        path: 'exposicao',
        loadChildren: () => import('./exposicao/exposicao.module').then(m => m.ExposicaoModule)
    },
    {
        path: 'exposicao/:id',
        loadChildren: () => import('./exposicao/exposicao.module').then(m => m.ExposicaoModule)
    }
     
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [ExposicoesComponent],
    providers: [
        ExposicoesService
    ]
})

export class ExposicoesModule {}
