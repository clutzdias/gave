import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage.service';
import { TopicosComponent } from './topicos/topicos.component';
import { TopicoComponent } from './topicos/topico/topico.component';
import { FormTopicoComponent } from './topicos/form-topico/form-topico.component';
import { LogsComponent } from './logs/logs.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';


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
    AppRoutingModule,
    MdbFormsModule,
    HttpClientModule
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
