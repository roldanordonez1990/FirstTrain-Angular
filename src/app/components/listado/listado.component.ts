import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos.service';
import { MisreservasService } from 'src/app/services/misreservas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Mezcla } from '../../interfaces/interfaces';
import { Horario } from '../../interfaces/interfaces';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  panelOpenState = false;
  listadoGrupos: Mezcla[];
  listadoHorasDisponibles: Horario[];

  dataSourceTabla: MatTableDataSource<Mezcla>
  columnas: string[] = ['Nombre', 'Apellidos', 'Horario'];
  constructor(private getGruposService: GruposService,private misreservasService: MisreservasService) { }

  ngOnInit(): void {
   
    //Lo pongo aquí también primero porque si no da pete 
    this.getGruposService.getDatosGrupos(0).subscribe(data =>{
      this.dataSourceTabla = new MatTableDataSource<Mezcla>(data['grupos']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoGrupos = data['grupos'];
    });

/**
 * 
 */
     this.misreservasService.getHoras().subscribe(data => {
      this.listadoHorasDisponibles = data['horas'];
      console.log(this.listadoHorasDisponibles);
    });
  }


  quieroLaHora(id_horario){
    this.getGruposService.getDatosGrupos(id_horario).subscribe(data =>{
      this.dataSourceTabla = new MatTableDataSource<Mezcla>(data['grupos']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoGrupos = data['grupos'];
    });
  }
}
