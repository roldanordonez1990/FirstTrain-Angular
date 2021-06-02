import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuMezcla } from 'src/app/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class GestionService {

  listadoTodosLosUsuarios: Usuario[];
  constructor(private http: HttpClient) { }

  /**
   * 
   */

   getDatosTodasLosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('/usuario/todasLosDatosUsuarios').pipe(
      tap(dataUsu => {
        this.listadoTodosLosUsuarios = dataUsu['todasLosDatosUsuario'];
      })
    );
  }

  /**
   * 
   */

   deleteUsers(id_usuario: number): Observable<Usuario> {

    return this.http.delete<Usuario>('/usuario/delete?id_usuario=' + id_usuario).pipe(
      tap(data => console.log(id_usuario)),

    );

  }
}
