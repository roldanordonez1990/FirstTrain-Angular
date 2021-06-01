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
export class TodasLasReservasService {
  reservaComprobada: Reserva[];
  resultadoTablaMezcla: Mezcla[];
  usuarioAutenticado: number;
  listadoHorasDisponibles: Horario[];

  constructor(private http: HttpClient) { }

  getDatosTodasLasReservas(): Observable<Mezcla[]> {
    return this.http.get<Mezcla[]>('/reserva/todasLasReservasMezcla').pipe(
      tap(dataUsu => {
        this.resultadoTablaMezcla = dataUsu['todasLasReservas'];
      })
    );
  }

  /**
   * 
   */

   comprobacionReserva(id_hora: number, id_usu: number): Observable<Reserva> {
    
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.get<Reserva>('/reserva/comprobacionDesdeAdmin?id_hora='+id_hora + '&id_usu=' + id_usu).pipe(
      tap(dataUsu => {
        this.reservaComprobada = dataUsu['existe'];
      })
    );
    }

    /**
     * 
     */

     updateReservas(id_hora: number, id_reservas: number): Observable<Reserva> {

      return this.http.get<Reserva>('/reserva/updateHora?id_hora=' + id_hora + '&id_reservas=' + id_reservas).pipe(
        tap(data => console.log(id_reservas)),
  
      );
  
    }
}
