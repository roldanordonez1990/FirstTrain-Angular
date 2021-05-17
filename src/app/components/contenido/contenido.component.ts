import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { JwtService } from '../../services/jwt.service';
import { ContenidoService } from 'src/app/services/contenido.service';
import { UsuariologinService } from 'src/app/services/usuariologin.service';
import { DialogosService } from '../../services/dialogos.service';
import { DialogTypes } from '../../components/dialogos/dialogos-general';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  usuarioAutenticado: Usuario // Guardo el usuario autenticado

  constructor(private contenidoService: ContenidoService,
    private usuariosService: UsuariologinService, private router: Router,
    private dialogosService: DialogosService, private autenticadorJwtService: JwtService) { }

  ngOnInit(): void {

    this.usuariosService.getUsuarioAutenticado().subscribe(usuario => {
      console.log("HOLA" +usuario);
      if (usuario == null){
        this.router.navigate(['/login']);
        console.log("PAYASOOOOOOOO NO ENTRAS");
      }
      
      else {
        this.contenidoService.getDatosUsuario().subscribe(data => {
          this.usuarioAutenticado = data['nombre'];
          console.log("HAS ENTRADO");
          //this.router.navigate(['/contenido']);
         
        });
    
      }
    });
  }

}
