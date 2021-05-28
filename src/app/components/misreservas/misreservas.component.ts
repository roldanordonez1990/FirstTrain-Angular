import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mezcla } from '../../interfaces/interfaces';
import { Usuario } from '../../interfaces/interfaces';
import { Horario } from '../../interfaces/interfaces';
import { Reserva } from '../../interfaces/interfaces';
import { MisreservasService } from 'src/app/services/misreservas.service';
import { DialogosService } from '../../services/dialogos.service';

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


  constructor(private misreservasService: MisreservasService, private dialogoService: DialogosService) { }

  ngOnInit(): void {

    this.misreservasService.getDatosUsuario().subscribe(data => {
      this.usuarioAutenticado = data['nombre'];
      
      //this.router.navigate(['/contenido']);
    });
  /**
   * 
   */
    this.misreservasService.getDatosMisReservas().subscribe(data =>{
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

   deleteReserva(id_reservas){
    //this.dialogosService.abrirDialogCargando();
    this.misreservasService.deleteReservas(id_reservas).subscribe(data => {
      //        console.log(data);
    //this.dialogosService.cerrarDialogo();
    this.dialogoService.abrirDialogInfo("¡Tu reserva ha sido eliminada!").subscribe(opcionElegida => {
      window.location.reload();
        });
      
      });
  }
  
  /**
   * 
   */

   updateReserva(id_reservas, id_hora){
    //this.dialogosService.abrirDialogCargando();
    this.misreservasService.comprobacionReserva(id_hora).subscribe(data => {
      this.reservas = data['existe'];
      if(this.reservas != null){
       this.dialogoService.abrirDialogInfo("¡Lo siento! Ya has reservado esta hora").subscribe(opcionElegida => {
       
       });
      }else{
        this.misreservasService.updateReservas(id_reservas, id_hora).subscribe(data => {
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