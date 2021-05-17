import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { JwtService } from '../../services/jwt.service';
import { NavigationHeaderService } from 'src/app/services/navigation-header.service';
import { UsuariologinService } from 'src/app/services/usuariologin.service';
import { DialogosService } from '../../services/dialogos.service';
import { DialogTypes } from '../../components/dialogos/dialogos-general';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  usuarioAutenticado: Usuario[] // Guardo el usuario autenticado
  usuarioAutenticado1: Usuario[]
  constructor(private navigationHeaderService: NavigationHeaderService,
    private usuariosService: UsuariologinService, private router: Router,
    private dialogosService: DialogosService, private autenticadorJwtService: JwtService) { }

  ngOnInit(): void {

        this.navigationHeaderService.getDatosUsuario().subscribe(data => {
          this.usuarioAutenticado = data['nombre'];
          this.usuarioAutenticado1 = data['apellidos'];
         console.log("hola soy tu amigo");
         console.log(this.usuarioAutenticado);
        });
    
  }

  abandonarSesion() {
    this.dialogosService.abrirDialogConfirmacion("¿Quieres abandonar la sesión?").subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.autenticadorJwtService.eliminaJWT();
        this.usuarioAutenticado = null;
        this.router.navigate(['/login']);
      }
    });
  }

}
