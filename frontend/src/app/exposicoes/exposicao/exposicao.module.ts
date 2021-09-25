import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExposicaoComponent } from './exposicao.component';
import { ExposicoesService } from '../../services/exposicoes.service';

const routes: Routes = [
    {
        path: '',
        component: ExposicaoComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ExposicaoComponent]
})
export class ExposicaoModule{}
