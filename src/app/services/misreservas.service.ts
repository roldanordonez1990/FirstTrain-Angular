import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Mezcla } from 'src/app/interfaces/interfaces';
import { Reserva } from 'src/app/interfaces/interfaces';
import { Horario } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MisreservasService {
  reservaComprobada: Reserva[];
  resultadoTablaMezcla: Mezcla[];
  usuarioAutenticado: number;
  listadoHorasDisponibles: Horario[];

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
   * @returns 
   */
     getHorasDisponibles(): Observable<Horario[]> {
      return this.http.get<Horario[]>('/todasLasHorasDisponibles/all').pipe(
        tap(dataUsu => {
          this.listadoHorasDisponibles = dataUsu['horasDisponibles'];
        })
      );
    }

    getHoras(): Observable<Horario[]> {
      return this.http.get<Horario[]>('/todasLasHoras/all').pipe(
        tap(dataUsu => {
          this.listadoHorasDisponibles = dataUsu['horas'];
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

      /**
       * 
       * @param id_hora 
       * @returns 
       */
      comprobacionReserva(id_hora: number): Observable<Reserva> {
    
        // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
        return this.http.get<Reserva>('/reserva/comprobacion?id_hora='+id_hora).pipe(
          tap(dataUsu => {
            this.reservaComprobada = dataUsu['existe'];
          })
        );
        }

}
