import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogosService } from '../../services/dialogos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router,
    private dialogosService: DialogosService) { }

  ngOnInit(): void {
  }

  volverAwelcome() {
    this.dialogosService.abrirDialogCargando();
    this.router.navigate(['/welcome']);
    this.dialogosService.cerrarDialogo();

  }


}
