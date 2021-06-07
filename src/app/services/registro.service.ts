import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5'; // Para codificar en MD5
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario, Nivel_Entrenamiento } from '../interfaces/interfaces'


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }
  usuarioAutenticado: Usuario[];


  registroNuevoUsuario(nombre: string, apellidos: string, dni: string, 
    email: string, telefono: string, direccion: string, edad: Date, nivel: number, password: string, info: string): Observable<Usuario> {
    const md5 = new Md5(); // Creo un objeto que permite codificar en MD5
    var jsonObject = {
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      email: email,
      telefono: telefono,
      direccion: direccion,
      edad: edad,
      nivel: nivel,
      //password: md5.appendStr(password).end().toString(), // Codifico en MD5 el password recibido
      password: password,
      info: info 
    };

    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<Usuario>('/usuario/nuevoRegistro', jsonObject).pipe(
      tap(data => {

      })
    );
  }

  /**
   * 
   * @returns 
   */
  getTodosLosNivelesEntrenamiento(): Observable<Nivel_Entrenamiento[]> {
    return this.http.get<Nivel_Entrenamiento[]>('/todosLosNiveles/all').pipe(
      //    tap(data => console.log(data)),
    );
  }

    /**
   * 
   * @returns 
   */
     compruebaDniExistente(dni: string): Observable<Usuario[]> {
      var jsonObject2 = {
      
        dni: dni
       
      };
      return this.http.post<Usuario[]>('/usuario/comprobacion', jsonObject2).pipe(
        //    tap(data => console.log(data)),
      );
    }
  
}
