import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mezcla } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaces';
import { Horario } from '../../interfaces/interfaces';
import { Reserva } from '../../interfaces/interfaces';
import { MisreservasService } from 'src/app/services/misreservas.service';
import { NavigationHeaderService } from 'src/app/services/navigation-header.service';
import { DialogosService } from '../../services/dialogos.service';
import { DialogTypes } from '../../components/dialogos/dialogos-general';

@Component({
  selector: 'app-misreservas',
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.css']
})
export class MisreservasComponent implements OnInit {
  usuarioAutenticado: Usuario[]; // Guardo el usuario autenticado
  dataSourceTabla: MatTableDataSource<Mezcla>
  columnas: string[] = ['Nombre', 'Apellidos', 'Fecha', 'Horario', 'Cambiar', 'Eliminar'];
  listadoMisReservas: Mezcla[];
  listadoHorasDisponibles: Horario[];
  reservas: Reserva[];
  usuarioAutenticado2: number;

  constructor(private misreservasService: MisreservasService, private dialogoService: DialogosService,
    private navigationHeaderService: NavigationHeaderService, private router: Router) { }

  ngOnInit(): void {

    this.navigationHeaderService.getDatosUsuario().subscribe(data => {

      this.usuarioAutenticado2 = data['rol'];
      if (this.usuarioAutenticado2 == null) {
        this.router.navigate(['/welcome']);
      }

    });
    this.misreservasService.getDatosUsuario().subscribe(data => {
      this.usuarioAutenticado = data['nombre'];

      //this.router.navigate(['/contenido']);
    });
    /**
     * 
     */
    this.misreservasService.getDatosMisReservas().subscribe(data => {
      this.dataSourceTabla = new MatTableDataSource<Mezcla>(data['misReservas']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoMisReservas = data['misReservas'];
    });

    /**
     * 
     */
    this.misreservasService.getHorasDisponibles().subscribe(data => {
      this.listadoHorasDisponibles = data['horasDisponibles'];
      console.log(this.listadoHorasDisponibles);
    });

  }

  /**
   * 
   */

  deleteReserva(id_reservas) {

    this.dialogoService.abrirDialogConfirmacion("¿Quieres eliminar tu reserva?").subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.misreservasService.deleteReservas(id_reservas).subscribe(data => {

          window.location.reload();
        });
      }

    });
  }

  /**
   * 
   */

  updateReserva(id_reservas, id_hora) {
    //this.dialogosService.abrirDialogCargando();
    this.misreservasService.comprobacionReserva(id_hora).subscribe(data => {
      this.reservas = data['existe'];
      if (this.reservas != null) {
        this.dialogoService.abrirDialogInfo("¡Lo siento! Ya has reservado esta hora").subscribe(opcionElegida => {

        });
      } else {


        this.dialogoService.abrirDialogConfirmacion("¿Quieres cambiar tu reserva a esta hora?").subscribe(opcionElegida => {
          if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
            this.misreservasService.updateReservas(id_reservas, id_hora).subscribe(data => {
              window.location.reload();
            });
          }
        });
      }
    });

  }

}
