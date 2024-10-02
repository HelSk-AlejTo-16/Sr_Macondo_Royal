import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myappUrl:string;
  private myapiUrl:string;


  constructor(private http:HttpClient) {
    this.myappUrl = environment.endpoint;
    this.myapiUrl = 'api/clientes/'
  }

  saveCliente(cliente:Cliente):Observable<void>{
    return this.http.post<void>(`${this.myappUrl}${this.myapiUrl}`,cliente)
  }


}
