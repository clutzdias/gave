import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopicoComponent } from './topico.component';
import { MensagensComponent } from 'src/app/mensagens/mensagens.component';

const routes: Routes = [
    {
        path: '',
        component: TopicoComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TopicoComponent, MensagensComponent]
})
export class TopicoModule{}
