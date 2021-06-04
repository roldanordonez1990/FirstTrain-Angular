import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/interfaces';
import { Nivel_Entrenamiento } from '../../interfaces/interfaces';
import { UsuariologinService } from 'src/app/services/usuariologin.service';
import { RegistroService } from 'src/app/services/registro.service';
import { GestionService } from 'src/app/services/gestion.service';
import { Router } from '@angular/router';
import { DialogosService } from '../../services/dialogos.service';
import { NavigationHeaderService } from 'src/app/services/navigation-header.service';
import { DialogTypes } from '../../components/dialogos/dialogos-general';
import { Md5 } from 'ts-md5/dist/md5'; // Para codificar en MD5
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  usuario: Usuario = null;
  usuarioAutenticado2: number;
  updateRegistroForm: FormGroup;
  listadoNivelesEntrenamiento: Nivel_Entrenamiento[];
  usuarioAutenticado3: number;
  constructor(private rutaActiva: ActivatedRoute, private usuarioService: UsuariologinService,
    private router: Router, private registroServi: RegistroService, private dialogosService: DialogosService,
    private gestionService: GestionService,private navigationHeaderService: NavigationHeaderService) { }

  ngOnInit(): void {
    
    //Esto hace que podamos recoger el parámetro enviado por la URL
    this.usuarioAutenticado3 = this.rutaActiva.snapshot.params.usuarioAutenticado3;
    this.cargarDatosUsuarioAutenticado2();
    console.log("Hola soy" + this.usuarioAutenticado3);
    this.updateRegistroForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
      edad: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      //password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      nivel: new FormControl('', [Validators.required]),
      info: new FormControl(''),
      id_usuario: new FormControl('')
    });

    /**
     * 
     */

    this.registroServi.getTodosLosNivelesEntrenamiento().subscribe(data => {

      this.listadoNivelesEntrenamiento = data['niveles'];
      console.log(this.registroServi);
    });
  }

  /**
   * 
   */

  // Este método llama al servicio de usuarios, le pide obtener el usuario autenticado y pone sus datos en pantalla.
  cargarDatosUsuarioAutenticado2() {

    this.usuarioService.getUsuarioAutenticado2().subscribe(usuarioData => {
      console.log(usuarioData);
      if (usuarioData == null) {

        this.router.navigate(['/login']);
      } else {

        // Cuando obtengo los datos, los muestro en los controles del formulario.
        this.usuario = usuarioData;
        this.updateRegistroForm.controls.nombre.setValue(this.usuario.nombre);
        this.updateRegistroForm.controls.email.setValue(this.usuario.email);
        //this.updateRegistroForm.controls.password.setValue( this.usuario.password);
        this.updateRegistroForm.controls.dni.setValue(this.usuario.dni);
        this.updateRegistroForm.controls.direccion.setValue(this.usuario.direccion);
        this.updateRegistroForm.controls.telefono.setValue(this.usuario.telefono);
        this.updateRegistroForm.controls.edad.setValue(this.usuario.edad);
        this.updateRegistroForm.controls.nivel.setValue(this.usuario.nivel);
        this.updateRegistroForm.controls.info.setValue(this.usuario.info);
        this.updateRegistroForm.controls.apellidos.setValue(this.usuario.apellidos);
        this.updateRegistroForm.controls.id_usuario.setValue(this.usuario.id_usuario);

      }
    });
  }

  /**
   * 
   */

  updateUsuarioRegistrado() {
    this.dialogosService.abrirDialogCargando();
    this.gestionService.updateUsuario(this.updateRegistroForm.controls.id_usuario.value,
      this.updateRegistroForm.controls.nombre.value,
      this.updateRegistroForm.controls.apellidos.value, this.updateRegistroForm.controls.dni.value,
      this.updateRegistroForm.controls.email.value, this.updateRegistroForm.controls.telefono.value,
      this.updateRegistroForm.controls.direccion.value, this.updateRegistroForm.controls.edad.value,
      this.updateRegistroForm.controls.nivel.value,
      this.updateRegistroForm.controls.info.value).subscribe(data => {
        //        console.log(data);
        //this.dialogosService.cerrarDialogo();
        //window.location.reload();
        this.dialogosService.abrirDialogConfirmacion("Usuario actualizado correctamente").subscribe(opcionElegida => {
          if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {

            this.router.navigate(['/welcome']);
          }
        });
      });
  }

  /**
   * 
   */
  volverAwelcome() {
    this.router.navigate(['/welcome']);
  }

}
