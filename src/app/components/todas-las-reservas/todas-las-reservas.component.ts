import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mezcla } from '../../interfaces/interfaces';
import { Usuario } from '../../interfaces/interfaces';
import { Horario } from '../../interfaces/interfaces';
import { Reserva } from '../../interfaces/interfaces';
import { MisreservasService } from 'src/app/services/misreservas.service';
import { TodasLasReservasService } from 'src/app/services/todas-las-reservas.service';
import { NavigationHeaderService } from 'src/app/services/navigation-header.service';
import { DialogosService } from '../../services/dialogos.service';
import { Router } from '@angular/router';
import { DialogTypes } from '../../components/dialogos/dialogos-general';

@Component({
  selector: 'app-todas-las-reservas',
  templateUrl: './todas-las-reservas.component.html',
  styleUrls: ['./todas-las-reservas.component.css']
})

export class TodasLasReservasComponent implements OnInit {

  usuarioAutenticado: Usuario[]; // Guardo el usuario autenticado
  dataSourceTabla: MatTableDataSource<Mezcla>
  columnas: string[] = ['Nombre', 'Apellidos', 'Fecha', 'Horario', 'Cambiar', 'Eliminar'];
  listadoTodasLasReservas: Mezcla[];
  listadoHorasDisponibles: Horario[];
  usuarioAutenticado2: number;
  reservas: Reserva[];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTabla.filter = filterValue.trim().toLowerCase();
  }


  constructor(private todasLasReservasService: TodasLasReservasService,
    private misReservasService: MisreservasService, private dialogoService: DialogosService,
    private navigationHeaderService: NavigationHeaderService, private router: Router) { }

  ngOnInit(): void {

    this.navigationHeaderService.getDatosUsuario().subscribe(data => {

      this.usuarioAutenticado2 = data['rol'];
      if (this.usuarioAutenticado2 != 1) {
        this.router.navigate(['/welcome']);
      }
      console.log(this.usuarioAutenticado);
    });
    this.todasLasReservasService.getDatosTodasLasReservas().subscribe(data => {
      this.dataSourceTabla = new MatTableDataSource<Mezcla>(data['todasLasReservas']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoTodasLasReservas = data['todasLasReservas'];
    });

    /**
     * 
     */

    this.misReservasService.getHorasDisponibles().subscribe(data => {
      this.listadoHorasDisponibles = data['horasDisponibles'];
      console.log(this.listadoHorasDisponibles);
    });


  }

  /**
 * 
 */

  deleteReserva(id_reservas) {

    this.dialogoService.abrirDialogConfirmacion("¿Quieres eliminar esta reserva?").subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.misReservasService.deleteReservas(id_reservas).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }


  /**
   * 
   */

  updateReserva(id_reservas, id_hora, id_usu) {
    //this.dialogosService.abrirDialogCargando();
    this.todasLasReservasService.comprobacionReserva(id_hora, id_usu).subscribe(data => {
      this.reservas = data['existe'];
      if (this.reservas != null) {
        this.dialogoService.abrirDialogInfo("¡Lo siento! Ya ha reservado esta hora").subscribe(opcionElegida => {

        });
      } else {

        this.dialogoService.abrirDialogConfirmacion("¿Quieres actualizar esta reserva?").subscribe(opcionElegida => {
          if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
            this.misReservasService.updateReservas(id_reservas, id_hora).subscribe(data => {
              window.location.reload();
            });
          }
        });
      }
    });

  }

}
