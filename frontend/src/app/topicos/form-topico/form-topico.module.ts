import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormTopicoComponent } from './form-topico.component';

const routes: Routes = [
    {
        path: '',
        component: FormTopicoComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule, 
    ],
    declarations: [
        FormTopicoComponent
    ],
    providers: [
        
    ]
})
export class FormTopicoModule {}
