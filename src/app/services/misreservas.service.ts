import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Mezcla } from 'src/app/interfaces/interfaces';
import { Reserva } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MisreservasService {

  resultadoTablaMezcla: Mezcla[];
  usuarioAutenticado: number;

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  getDatosMisReservas(usuarioAutenticado: 1): Observable<Mezcla[]> {
    return this.http.get<Mezcla[]>('/reserva/misReservas?id_usu='+usuarioAutenticado).pipe(
      tap(dataUsu => {
        this.resultadoTablaMezcla = dataUsu['misReservas'];
      })
    );
  }

  /**
   * 
   */

   getDatosUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('/usuario/getDatos').pipe(
      tap(dataUsu => {
        this.usuarioAutenticado = dataUsu['id_usuario'];
      })
    );
  }


}
