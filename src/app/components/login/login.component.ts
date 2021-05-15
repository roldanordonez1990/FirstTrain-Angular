import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogosService } from '../../services/dialogos.service';
import { UsuariologinService } from 'src/app/services/usuariologin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtService } from '../../services/jwt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup; 
  ocultarPassword: boolean = true;

  constructor(private router: Router, private dialogosService: DialogosService, private usuarioService: UsuariologinService,
    private autenticadorJwtService: JwtService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      password: new FormControl('', [Validators.required])
    });
  }

  autenticarUsuario() {
    // Utilizo el "UsuarioService" para enviar los datos de logado y subscribirme a la respuesta del 
    // servidor
    this.dialogosService.abrirDialogCargando();
    this.usuarioService.autenticaUsuario(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value).subscribe(data => {
        //        console.log(data);
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt);
          console.log('Datos correctos');
          this.router.navigate(['/listadoCometidos']);
          this.dialogosService.cerrarDialogo();
          this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado(); // Emito evento de cambio en usuario autenticado

        }
        else {
          this.dialogosService.abrirDialogError("Datos introducidos incorrectos");
          console.log('Datos incorrectos');
        }
      });
  }


  volverAwelcome() {
    this.dialogosService.abrirDialogCargando();
    this.router.navigate(['/welcome']);
    this.dialogosService.cerrarDialogo();

  }

}
