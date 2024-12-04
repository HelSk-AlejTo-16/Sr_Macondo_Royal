import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Correo } from '../interfaces/correo';


@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  private myappUrl:string;
  private myapiUrl:string;


  constructor(private http:HttpClient) {
    this.myappUrl = environment.endpoint;
    this.myapiUrl = '/api/correos/'
  }

  saveCorreo(correo:Correo):Observable<void>{
    return this.http.post<void>(`${this.myappUrl}${this.myapiUrl}`,correo)
  }
  saveCorreos (correoss: Correo): Observable<void> {
    return this.http.post<void>(`${this.myappUrl}${this.myapiUrl}`,correoss)
  }


}
