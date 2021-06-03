import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5'; // Para codificar en MD5
import { UsuMezcla } from 'src/app/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class GestionService {

  listadoTodosLosUsuarios: Usuario[];
  constructor(private http: HttpClient) { }

  updateUsuario(id_usuario: number, nombre: string, apellidos: string, dni: string, 
    email: string, telefono: string, direccion: string, edad: Date, nivel: number, password: string, info: string): Observable<Usuario> {
    const md5 = new Md5(); // Creo un objeto que permite codificar en MD5
    var jsonObject = {
      id_usuario: id_usuario,
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      email: email,
      telefono: telefono,
      direccion: direccion,
      edad: edad,
      nivel: nivel,
      password: md5.appendStr(password).end().toString(), // Codifico en MD5 el password recibido
      info: info 
    };

    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<Usuario>('/usuario/updateUser', jsonObject).pipe(
      tap(data => {

      })
    );
  }


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
