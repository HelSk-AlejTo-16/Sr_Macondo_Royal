import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) {

  }

  msgError(error: HttpErrorResponse) {
    if (error.error.msg) {
      this.toastr.error(error.error.msg, 'Error')
    } else {
      this.toastr.error('Upps!, ocurrio un error, comunicate con el administrador','Error')
    }
  }

}
