import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { PaginausuarioComponent } from './paginausuario.component';
import { TrabalhosService } from '../services/trabalhos.service';

const routes: Routes = [
    {
        path: '',
        component: PaginausuarioComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'trabalhoedit',
        loadChildren: () => import('./form-trabalho/form-trabalho.module').then(m => m.FormTrabalhoModule)
    },
    {
        path: 'trabalhoedit/:id',
        loadChildren: () => import('./form-trabalho/form-trabalho.module').then(m => m.FormTrabalhoModule)
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatListModule

    ],
    declarations: [
        PaginausuarioComponent,
    ],
    providers: [
        TrabalhosService
    ]
})
export class PaginaUsuarioModule {}
