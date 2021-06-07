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
import { DialogTypes } from '../../components/dialogos/dialogos-general';
import { NavigationHeaderService } from 'src/app/services/navigation-header.service';
import { Md5 } from 'ts-md5/dist/md5'; // Para codificar en MD5
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-modifica-user',
  templateUrl: './modifica-user.component.html',
  styleUrls: ['./modifica-user.component.css']
})
export class ModificaUserComponent implements OnInit {
  usuario: Usuario = null;
  updateRegistroForm: FormGroup;
  listadoNivelesEntrenamiento: Nivel_Entrenamiento[];
  id_usuario: number;
  usuarioAutenticado2: number;
  constructor(private rutaActiva: ActivatedRoute, private usuarioService: UsuariologinService,
    private router: Router, private registroServi: RegistroService, private dialogosService: DialogosService,
    private gestionService: GestionService,private navigationHeaderService: NavigationHeaderService) { }

  ngOnInit(): void {
  this.usuarioService.getUsuarioAutenticado(this.id_usuario).subscribe(usuario => {
      if (usuario == null) { // Si no hay usuario autenticado, redirijo al login
        this.router.navigate(['/welcome']);
      }
     
    });
    this.navigationHeaderService.getDatosUsuario().subscribe(data => {
    
      this.usuarioAutenticado2 = data['rol'];
     if(this.usuarioAutenticado2 == null || this.usuarioAutenticado2 != 1){
      this.router.navigate(['/welcome']);
     }
     
    });
    //Esto hace que podamos recoger el parámetro enviado por la URL
    this.id_usuario = this.rutaActiva.snapshot.params.id_usuario;
    this.cargarDatosUsuarioAutenticado(this.id_usuario);

    this.updateRegistroForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
    cargarDatosUsuarioAutenticado(id_usuario) {
     
      this.usuarioService.getUsuarioAutenticado(id_usuario).subscribe(usuarioData => {
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
  
              this.router.navigate(['/gestion']);
            }
          });
        });
    }

  /**
   * 
   */
  volverAgestion() {
    this.router.navigate(['/gestion']);
  }

}
