import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { PaginausuarioComponent } from './paginausuario.component';
import { TrabalhosService } from '../services/trabalhos.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PaginausuarioComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }    
        ]),
        ReactiveFormsModule
    ],
    declarations: [
        PaginausuarioComponent
        
    ],
    providers: [
        TrabalhosService
    ]
})
export class LoginModule {}
