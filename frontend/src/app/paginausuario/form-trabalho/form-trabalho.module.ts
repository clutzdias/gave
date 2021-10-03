import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormTrabalhoComponent } from './form-trabalho.component';
import { TrabalhosService } from 'src/app/services/trabalhos.service';

const routes: Routes = [
    {
        path: '',
        component: FormTrabalhoComponent
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
        FormTrabalhoComponent
    ],
    providers: [
        TrabalhosService
    ]
})
export class FormTrabalhoModule {}
