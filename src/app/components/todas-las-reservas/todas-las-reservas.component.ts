import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mezcla } from '../../interfaces/interfaces';
import { Usuario } from '../../interfaces/interfaces';
import { Horario } from '../../interfaces/interfaces';
import { Reserva } from '../../interfaces/interfaces';
import { MisreservasService } from 'src/app/services/misreservas.service';
import { TodasLasReservasService } from 'src/app/services/todas-las-reservas.service';
import { DialogosService } from '../../services/dialogos.service';

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
  reservas: Reserva[];
  constructor(private todasLasReservasService: TodasLasReservasService,
    private misReservasService: MisreservasService, private dialogoService: DialogosService) { }

  ngOnInit(): void {

    this.todasLasReservasService.getDatosTodasLasReservas().subscribe(data =>{
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

   updateReserva(id_reservas, id_hora, id_usu){
    //this.dialogosService.abrirDialogCargando();
    this.todasLasReservasService.comprobacionReserva(id_hora, id_usu).subscribe(data => {
      this.reservas = data['existe'];
      if(this.reservas != null){
       this.dialogoService.abrirDialogInfo("¡Lo siento! Ya has reservado esta hora").subscribe(opcionElegida => {
       
       });
      }else{
        this.todasLasReservasService.updateReservas(id_reservas, id_hora, id_usu).subscribe(data => {
          //        console.log(data);
        //this.dialogosService.cerrarDialogo();
        this.dialogoService.abrirDialogInfo("¡Tu reserva ha sido actualizada!").subscribe(opcionElegida => {
          window.location.reload();
          });
          
        });
      }
    });
    
  }

}
