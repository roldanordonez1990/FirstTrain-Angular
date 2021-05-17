import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuariologinService } from 'src/app/services/usuariologin.service';


@Injectable({
  providedIn: 'root'
})
export class NavigationHeaderService {

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
}
