import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage.service';
import { TopicosComponent } from './topicos/topicos.component';
import { TopicoComponent } from './topicos/topico/topico.component';
import { FormTopicoComponent } from './topicos/form-topico/form-topico.component';
import { LogsComponent } from './logs/logs.component';


@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    TopicosComponent,
    TopicoComponent,
    FormTopicoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
