import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataType, DialogTypes } from './dialogos-general';

@Component({
  selector: 'app-dialogos',
  templateUrl: './dialogos.component.html',
  styleUrls: ['./dialogos.component.css']
})
export class DialogosComponent implements OnInit {

  // La siguiente propiedad nos va a permitir acceder a las "constantes" definidas en el tipo
  // "DialogTypes", definido en el fichero "dialog-data-type.ts", en esta misma carpeta.
  public dialogTypesClass = DialogTypes;
  // La variable "data" será accesible desde el template (html) de este componente
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataType) { }

  ngOnInit(): void {
  }

}
