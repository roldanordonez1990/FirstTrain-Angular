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
  getDatosMisReservas(): Observable<Mezcla[]> {
    return this.http.get<Mezcla[]>('/reserva/misReservas').pipe(
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

    /**
   * 
   */

     deleteReservas(id_reservas: number): Observable<Reserva> {

      return this.http.delete<Reserva>('/reserva/delete?id_reservas=' + id_reservas).pipe(
        tap(data => console.log(id_reservas)),
  
      );
  
    }

      /**
   * 
   */

       updateReservas(id_reservas: number, id_hora: number): Observable<Reserva> {

        return this.http.get<Reserva>('/reserva/updateHora?id_reservas=' + id_reservas + '&id_hora=' + id_hora).pipe(
          tap(data => console.log(id_reservas)),
    
        );
    
      }


}
