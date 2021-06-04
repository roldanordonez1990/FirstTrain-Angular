import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt } from '../interfaces/interfaces';
import { Usuario } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5'; // Para codificar en MD5

/**
 * El decorador @Inyectable permite que esta clase se instancie por el inyector de código
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Esta clase permitirá autenticar y modificar datos del usuario
 */
export class UsuariologinService {
  // Para almacenar el usuario autenticado
  usuarioAutenticado: Usuario;
  //output sirve para comunicarse entre componentes
  @Output()
  // Evento cuando el usuario autenticado ha cambiado
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();
  // Constructor con objetos que deben crearse por parte del inyector de código.
  constructor(private http: HttpClient) { }


  /**
   * Método para autenticar al usuario, recibiendo su nombre y su contraseña.
   */
  autenticaUsuario(dni: string, password: string): Observable<DatosConJwt> {
    const md5 = new Md5(); // Creo un objeto que permite codificar en MD5
    var jsonObject = {
      dni: dni,
      password: md5.appendStr(password).end().toString()  // Codifico en MD5 el password recibido
    };

    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<DatosConJwt>('/usuario/autenticadoJWT', jsonObject).pipe(
      tap(data => {
        console.log('Desde tap miro los datos recibidos: ' + data["jwt"]);
      })
    );
  }

  getDatosUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>('/usuario/getDatos');
  }
  /**
   * 
   */
  getUsuarioAutenticado(id_usuario: number): Observable<Usuario> {
    // Petición para obtener el usuario autenticado, funcionará porque se envía el JWT en 
    // cada petición, gracias al HttpInterceptor
    return this.http.get<Usuario>('/usuario/autenticadoImagen?id_usu=' +id_usuario)
      .pipe(
        tap(usuarioAutenticado => {
          this.usuarioAutenticado = usuarioAutenticado;

        })
      );
  }
  /**
   * 
   */
 

  /**
   * Comprueba si una determinada contraseña es igual a la del usuario autenticado
   */
   ratificaPasswordUsuarioAutenticado (password: string) : Observable<object> {
    var dto = {
      'password': password
    };
    return this.http.post<object>('/usuario/ratificaPassword', dto);
  }

     /**
   * Cambia la contraseña de un usuario por otra nueva
   */
      cambiaPasswordUsuarioAutenticado (nuevaPassword: string) : Observable<object> {
        var dto = {
          'password': nuevaPassword
        };
        return this.http.post<object>('/usuario/modificaPassword', dto);
      }
}
