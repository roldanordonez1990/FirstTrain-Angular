import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Horario } from 'src/app/interfaces/interfaces';
import { Reserva } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  reservaComprobada: Reserva[];
  usuarioAutenticado: Usuario[];
  constructor(private http: HttpClient) { }
/**
 * 
 * @returns 
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

   getHorasHorario(): Observable<Horario[]> {
    return this.http.get<Horario[]>('/todasLasHorasYDatosReserva/all').pipe(
      tap(dataHora => {
        this.usuarioAutenticado = dataHora['horas'];
        this.usuarioAutenticado = dataHora['reservas'];
      })
    );
  }

  /**
   * 
   */

   nuevaReservaPorUsuario(id_hora: number): Observable<Reserva> {
    
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.get<Reserva>('/reserva/nuevaReserva?id_hora='+id_hora).pipe(
      tap(data => console.log(id_hora)),

      );
  
    }

    /**
     * 
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
