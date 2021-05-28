import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogosComponent } from './components/dialogos/dialogos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './components/login/login.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MisreservasComponent } from './components/misreservas/misreservas.component';
import { ListadoComponent } from './components/listado/listado.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavigationHeaderComponent,
    FooterComponent,
    RegistroComponent,
    DialogosComponent,
    LoginComponent,
    ContenidoComponent,
    MisreservasComponent,
    ListadoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
