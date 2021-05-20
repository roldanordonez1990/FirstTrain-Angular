import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Horario } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  
  usuarioAutenticado: Usuario[];
  constructor(private http: HttpClient) { }
/**
 * 
 * @returns 
 */
  getDatosUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('/usuario/getDatos').pipe(
      tap(dataUsu => {
        this.usuarioAutenticado = dataUsu['nombre'];
      })
    );
  }

  /**
   * 
   */

   getHorasHorario(): Observable<Horario[]> {
    return this.http.get<Horario[]>('/todasLasHoras/all').pipe(
      tap(dataHora => {
        this.usuarioAutenticado = dataHora['horas'];
      })
    );
  }
}
