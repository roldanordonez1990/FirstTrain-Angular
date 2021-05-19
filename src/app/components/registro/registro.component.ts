import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogosService } from '../../services/dialogos.service';
import { DialogTypes } from '../../components/dialogos/dialogos-general';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Nivel_Entrenamiento } from '../../interfaces/interfaces';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup; 
  listadoNivelesEntrenamiento: Nivel_Entrenamiento[];

  constructor(private router: Router,
    private dialogosService: DialogosService, private registroServi: RegistroService) { }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      username: new FormControl ('', [Validators.required, Validators.minLength(4)]),
      apellidos: new FormControl ('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.minLength(9)]),
      direccion : new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
      edad: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      nivel: new FormControl('', [Validators.required]),
      info: new FormControl('')
    });

    this.registroServi.getTodosLosNivelesEntrenamiento().subscribe(data => {

      this.listadoNivelesEntrenamiento = data['niveles'];
      console.log(this.registroServi);
    });
  }

  volverAwelcome() {
    this.dialogosService.abrirDialogCargando();
    this.router.navigate(['/welcome']);
    this.dialogosService.cerrarDialogo();

  }

  /**
   * 
   */
   nuevoUsuarioRegistrado() {
    this.dialogosService.abrirDialogCargando();
    this.registroServi.registroNuevoUsuario(this.registroForm.controls.username.value,
      this.registroForm.controls.apellidos.value, this.registroForm.controls.dni.value, 
      this.registroForm.controls.email.value, this.registroForm.controls.telefono.value, 
      this.registroForm.controls.direccion.value, this.registroForm.controls.edad.value,
      this.registroForm.controls.nivel.value, this.registroForm.controls.password.value,
      this.registroForm.controls.info.value).subscribe(data => {
        //        console.log(data);
        //this.dialogosService.cerrarDialogo();
        //window.location.reload();
        this.dialogosService.abrirDialogConfirmacion("¡Registro correcto! Loguéate para entrar").subscribe(opcionElegida => {
          if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
    
            this.router.navigate(['/login']);
          }
        });
      });
  }

}
