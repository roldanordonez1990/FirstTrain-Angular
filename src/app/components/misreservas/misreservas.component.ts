import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mezcla } from '../../interfaces/interfaces';
import { Usuario } from '../../interfaces/interfaces';
import { MisreservasService } from 'src/app/services/misreservas.service';



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


  constructor(private misreservasService: MisreservasService) { }

  ngOnInit(): void {

    this.misreservasService.getDatosUsuario().subscribe(data => {
      this.usuarioAutenticado = data['id_usuario'];
      
      //this.router.navigate(['/contenido']);
    });
  /**
   * 
   */
    this.misreservasService.getDatosMisReservas(1).subscribe(data =>{
      this.dataSourceTabla = new MatTableDataSource<Mezcla>(data['misReservas']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoMisReservas = data['misReservas'];
    })
    
  }

}
