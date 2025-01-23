import { Component, OnInit } from '@angular/core';
import { AccederService } from '../../services/acceder.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-acceder',
  templateUrl: './acceder.component.html',
  styles: []
})
export class AccederComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _accederService: AccederService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService
  ) {
    this.formUsuario = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(300)]],
      password: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {}

  login() {
    //Validamos que el usuario ingrese datos
    if (this.formUsuario.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
  
    const usuario: Usuario = {
      Emp_Email: this.formUsuario.value.username.trim(),
      Contrasenia: this.formUsuario.value.password.trim()
    };
  
    // Log para depurar datos enviados
    console.log("Datos enviados al servicio:", usuario);
  
    this._accederService.login(usuario).subscribe({
      next: (response) => {
        console.log("Respuesta del backend:", response); // Log de la respuesta
  
        localStorage.setItem('id', response.id.toString());
        localStorage.setItem('IDRol', response.IDRol.toString());
        localStorage.setItem('token', response.token);
  
        // Para saber a qué página dirigir cargamos el IDRol en una variable
        const carga = Number(localStorage.getItem('IDRol'));
        console.log("IDRol cargado:", carga); // Log para verificar el rol
  
        // Primero evaluamos que sea alguno de los permitidos
        if (carga !== 1 && carga !== 2 && carga !== 3) {
          this.toastr.error(
            'No es un usuario admitido por el sistema, comuníquese con el administrador',
            'Error'
          );
          this.router.navigate(['/acceder']);
          return;
        }
  
        // Redirección según el rol
        if (carga === 1) {
          this.toastr.info('Bienvenido querido empleado', 'Sr Macondo Web');
          this.router.navigate(['/empleado']);
        } else if (carga === 2) {
          this.toastr.info('Bienvenido querido administrador', 'Sr Macondo Web');
          this.router.navigate(['/admin']);
        } else if (carga === 3) {
          this.toastr.info('Bienvenido super administrador', 'Sr Macondo Web');
          this.router.navigate(['/super-admin']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al iniciar sesión:', error); // Log de errores
        this._errorService.msgError(error);
      }
    });
  }}