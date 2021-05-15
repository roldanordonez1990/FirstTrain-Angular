import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogosService } from '../../services/dialogos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup; 

  constructor(private router: Router,
    private dialogosService: DialogosService) { }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      username: new FormControl ('', [Validators.required, Validators.minLength(4)]),
      apellidos: new FormControl ('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.minLength(9)]),
      password: new FormControl('', [Validators.required]),
      direccion : new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
      fecha: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      sexo: new FormControl('', [Validators.required]),
      nivel: new FormControl('', [Validators.required])

    });
  }

  volverAwelcome() {
    this.dialogosService.abrirDialogCargando();
    this.router.navigate(['/welcome']);
    this.dialogosService.cerrarDialogo();

  }


}
