import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TopicosComponent } from './topicos.component';

const routes: Routes = [
    {
        path: '',
        component: TopicosComponent
    },
    {
        path: 'topico',
        loadChildren: () => import('./topico/topico.module').then(m => m.TopicoModule)
    },
    {
        path: 'topico/:id',
        loadChildren: () => import('./topico/topico.module').then(m => m.TopicoModule)
    }
     
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [],
    providers: [
        
    ]
})

export class TopicosModule {}
