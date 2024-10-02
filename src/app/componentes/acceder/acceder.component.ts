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
  styles: ``
})
export class AccederComponent implements OnInit{

  formUsuario: FormGroup;

  constructor (private fb: FormBuilder,
    private _accederService: AccederService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService) {

      this.formUsuario = this.fb.group ({
        username: ['', [Validators.required, Validators.maxLength(30)]],
        password: ['', [Validators.required, Validators.maxLength(30)]]
      })

  }

  ngOnInit(): void {
  }



  login() {
    //Validamos que el usuario ingrese datos
    if(this.formUsuario.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    const usuario: Usuario = {
      Emp_Email: this.formUsuario.value.username,
      Contrasenia: this.formUsuario.value.password
    }

    this._accederService.login(usuario).subscribe({
      next: (response) => {
        localStorage.setItem('id', response.id.toString());
        localStorage.setItem('IDRol', response.IDRol.toString());
        localStorage.setItem('token',response.token);

        //Para saber a que pagina dirigir cargamos el IDRol en una variable
        const carga = Number(localStorage.getItem('IDRol'));

        //Primero evaluamos que sea alguna de las que deben ser, si no lo es se vuelve a cargar acceder
        if (carga != 1 && carga != 2 && carga != 3 ) {
          this.toastr.error('No es un usuario admitido por el sistema, comuniqiese con el administrador','Error');
          this.router.navigate(['/acceder'])
        }

        //Para empleados
        if (carga == 1) {
          this.toastr.info('Bienvenido querido empleado','Sr Macondo Web');
          this.router.navigate(['/empleado'])
        }

        //Para Administradores
        if (carga == 2) {
          this.toastr.info('Bienvenido querido empleado','Sr Macondo Web')
          this.router.navigate(['/admin'])
        }

        //Super administrador
        if (carga == 3) {
          this.toastr.info('Bienvenido querido empleado','Sr Macondo Web');
          this.router.navigate(['/super-admin'])
        }

      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al iniciar sesión:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      }
    });

  }



}
