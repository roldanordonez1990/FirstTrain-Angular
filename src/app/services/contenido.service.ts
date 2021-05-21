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

  usuarioAutenticado: Usuario[];
  reservas: Reserva[];
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

   nuevaReservaPorUsuario(id_hora: number, id_usu: number): Observable<Reserva> {
    
    var jsonObject = {
      id_hora: id_hora,
      id_usu: id_usu
    };

    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<Reserva>('/reserva/nuevaReserva', jsonObject).pipe(
      tap(data => {

      })
    );
  }
  
}
