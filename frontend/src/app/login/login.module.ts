import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent
            }    
        ]),
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}
