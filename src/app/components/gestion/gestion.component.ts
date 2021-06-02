import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../interfaces/interfaces';
import { UsuMezcla } from '../../interfaces/interfaces';
import { DialogosService } from '../../services/dialogos.service';
import { GestionService } from 'src/app/services/gestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  usuarioAutenticado: Usuario[]; // Guardo el usuario autenticado
  listadoTodosLosUsuarios: UsuMezcla[];

  dataSourceTabla: MatTableDataSource<UsuMezcla>
  columnas: string[] = ['Nombre', 'Apellidos', 'Telefono', 'Edad', 'Direccion', 'Dni', 'Info'
  , 'Nivel', 'Email', 'Actualizar', 'Eliminar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTabla.filter = filterValue.trim().toLowerCase();
  }
  constructor(private gestionService: GestionService, private dialogosService: DialogosService, 
    private router: Router,) { }

  ngOnInit(): void {

    this.gestionService.getDatosTodasLosUsuarios().subscribe(data =>{
      this.dataSourceTabla = new MatTableDataSource<UsuMezcla>(data['todasLosDatosUsuario']);
      //también se lo asignamos a este listado para poder usarlo
      this.listadoTodosLosUsuarios = data['todasLosDatosUsuario'];
    });
  }

  /**
   * 
   */

   deleteUser(id_usuario){
    //this.dialogosService.abrirDialogCargando();
    this.gestionService.deleteUsers(id_usuario).subscribe(data => {
      //        console.log(data);
    //this.dialogosService.cerrarDialogo();
    this.dialogosService.abrirDialogInfo("¡Este usuario ha sido eliminado!").subscribe(opcionElegida => {
      window.location.reload();
        });
      
      });
  }

  /**
   * 
   */

  goToModificar(){
    this.router.navigate(['/modifica']);
  }

}
