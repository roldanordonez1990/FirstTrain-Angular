import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { MisreservasComponent } from './components/misreservas/misreservas.component';
import { ListadoComponent } from './components/listado/listado.component';
import { TodasLasReservasComponent } from './components/todas-las-reservas/todas-las-reservas.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { ModificaUserComponent } from './components/modifica-user/modifica-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';


const routes: Routes = [

  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'contenido', component: ContenidoComponent},
  {path: 'misreservas', component: MisreservasComponent},
  {path: 'listado', component: ListadoComponent},
  {path: 'todaslasreservas', component: TodasLasReservasComponent},
  {path: 'gestion', component: GestionComponent},
  {path: 'modifica/:id_usuario', component: ModificaUserComponent},
  {path: 'updateUser/:usuarioAutenticado3', component: UpdateUserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
