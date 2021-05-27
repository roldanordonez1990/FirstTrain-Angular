import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtService } from '../../services/jwt.service';
import { ContenidoService } from 'src/app/services/contenido.service';
import { UsuariologinService } from 'src/app/services/usuariologin.service';
import { DialogosService } from '../../services/dialogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from '../../interfaces/interfaces';
import { Reserva } from '../../interfaces/interfaces';


import { DialogTypes } from '../../components/dialogos/dialogos-general';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  usuarioAutenticado: Usuario[] // Guardo el usuario autenticado
  columnas: string[] = ['Hora', 'Disponible', 'Plazas Restantes', 'Reservar'];
  listadoHoras: Horario[];
  reservas: Reserva[];
  //listadoReserva: Horario[];

 //asignamos a una variable el objeto tablaDatasource con los Cometidos
 dataSourceTabla: MatTableDataSource<Horario>
 panelOpenState = false;
 idHorarioParaReserva: FormGroup;

  constructor(private contenidoService: ContenidoService,
    private usuariosService: UsuariologinService, private router: Router,
    private dialogosService: DialogosService, private autenticadorJwtService: JwtService) { }

  ngOnInit(): void {

    this.idHorarioParaReserva = new FormGroup({
      idHora: new FormControl ()
     
    });
    this.contenidoService.getDatosUsuario().subscribe(data => {
      this.usuarioAutenticado = data['id_usuario'];
      console.log("HAS ENTRADO");
      //this.router.navigate(['/contenido']);
    });
    //Llamamos al método del servidor con el que recogemos todos los cometidos y le asignamos los resultados (data)
    //al objeto dataSourceTabla
    this.contenidoService.getHorasHorario().subscribe(data =>{
      this.dataSourceTabla = new MatTableDataSource<Horario>(data['horas']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoHoras = data['horas'];
    })
    

  }

  /**
   * 
   * @param idHora 
   */

  nuevaReserva(idHora){
    console.log("Me estás dando la hora?"+idHora);
    this.dialogosService.abrirDialogCargando();
    //this.dialogosService.abrirDialogCargando();
    this.contenidoService.comprobacionReserva(idHora).subscribe(data => {
     this.reservas = data['existe'];
     if(this.reservas != null){
      this.dialogosService.abrirDialogInfo("¡Lo siento! Ya has reservado esta hora").subscribe(opcionElegida => {
      
      });
     }else{
      this.contenidoService.nuevaReservaPorUsuario(idHora).subscribe(data => {
      
        //this.dialogosService.cerrarDialogo();
        //window.location.reload();
        this.dialogosService.abrirDialogInfo("¡Tu reserva ha sido realizada con éxito!").subscribe(opcionElegida => {
          window.location.reload();
              });
          });
     }
    });
    
  }

}
