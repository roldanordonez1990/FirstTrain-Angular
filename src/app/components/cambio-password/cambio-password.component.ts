import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariologinService } from '../../services/usuariologin.service';
import { DialogosService } from '../../services/dialogos.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {
  formPass: FormGroup;
  hideActual = true;  // Utilizado para mostrar u ocultar la contraseña actual
  hideNueva = true;  // Utilizado para mostrar u ocultar la nueva contraseña

  constructor(private router: Router,
    private usuarioService: UsuariologinService, private dialogoService: DialogosService) { }

  ngOnInit(): void {
    this.formPass = new FormGroup({
      actual: new FormControl('', [Validators.required]),
      nueva: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Actualizo el password por uno nuevo
   */
  actualizarPassword() {
    this.dialogoService.abrirDialogCargando();
    // Compruebo si la contraseña escrita es real para el usuario autenticado
    //this.comunicacionAlertas.abrirDialogCargando();
    var actualEncriptada = this.encriptaMD5(this.formPass.controls.actual.value); // Encripto la contraseña con MD5
    // Hago la petición al servicio de usuario, para ratificar la contraseña
    this.usuarioService.ratificaPasswordUsuarioAutenticado(actualEncriptada).subscribe(resultado => {
      console.log(resultado); // Por si quieres ver lo que llega del servidor
      if (resultado["result"] == 'fail') { // El servicio responde con un fallo al comprobar la contraseña
        this.dialogoService.abrirDialogError('La contraseña actual introducida no es válida o no se puede comprobar');
      }
      else { // Se ha ratificado la contraseña actual, se lanza el cambio de contraseña

        // Lanzo la llamada al cambio de contraseña
        //var nuevaEncriptada = this.encriptaMD5(this.formPass.controls.nueva.value); // Encripto la nueva contraseña
        var nuevaEncriptada = this.formPass.controls.nueva.value;
        // Envio al servicio la petición de cambio de contraseña
        this.usuarioService.cambiaPasswordUsuarioAutenticado(nuevaEncriptada).subscribe(resultado => {
          
          if (resultado["result"] == 'fail') { // Se obtiene fallo
            this.dialogoService.abrirDialogError('Error al actualizar la contraseña. Inténtelo más tarde.')
          }
          else { // todo ok.
            this.dialogoService.abrirDialogInfo('Contraseña actualizada con éxito').subscribe(result => {
              this.router.navigate(['/login']); 
            });
          }
        })
      }
    });
  }

  /**
   * Encripta un texto en MD5
   */
  encriptaMD5(texto: string): string {
    const md5 = new Md5();
    return md5.appendStr(texto).end().toString();
  }

  /**
   * Cancela el cambio de contraseña, vuelve al listado de mensajes
   */
  cancelar() {
    this.router.navigate(['/welcome']);
  }

}
