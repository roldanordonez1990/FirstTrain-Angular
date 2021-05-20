import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { JwtService } from '../../services/jwt.service';
import { ContenidoService } from 'src/app/services/contenido.service';
import { UsuariologinService } from 'src/app/services/usuariologin.service';
import { DialogosService } from '../../services/dialogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from '../../interfaces/interfaces';
import { DialogTypes } from '../../components/dialogos/dialogos-general';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  usuarioAutenticado: Usuario // Guardo el usuario autenticado
  columnas: string[] = ['Hora', 'Disponible', 'Plazas Restantes', 'Reservar'];
  listadoHoras: Horario[];

 //asignamos a una variable el objeto tablaDatasource con los Cometidos
 dataSourceTabla: MatTableDataSource<Horario>

  constructor(private contenidoService: ContenidoService,
    private usuariosService: UsuariologinService, private router: Router,
    private dialogosService: DialogosService, private autenticadorJwtService: JwtService) { }

  ngOnInit(): void {

    //Llamamos al método del servidor con el que recogemos todos los cometidos y le asignamos los resultados (data)
    //al objeto dataSourceTabla
    this.contenidoService.getHorasHorario().subscribe(data =>{
      this.dataSourceTabla = new MatTableDataSource<Horario>(data['horas']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoHoras = data['horas'];
    })
      
      /*
      else {
        this.contenidoService.getDatosUsuario().subscribe(data => {
          this.usuarioAutenticado = data['nombre'];
          console.log("HAS ENTRADO");
          //this.router.navigate(['/contenido']);
         
        });
    
      }
      */
    

  }

}
