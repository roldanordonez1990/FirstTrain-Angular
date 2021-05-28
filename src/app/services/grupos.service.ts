import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mezcla } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  resultadoTablaMezcla: Mezcla[];

  constructor(private http: HttpClient) { }

  getDatosGrupos(id_hora: number): Observable<Mezcla[]> {
    return this.http.get<Mezcla[]>('/reserva/grupos?id_hora=' +id_hora).pipe(
      tap(dataUsu => {
        this.resultadoTablaMezcla = dataUsu['grupos'];
      })
    );
  }
}
