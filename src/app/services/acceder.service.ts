import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AccederService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/login/';
  }

  login(usuario: Usuario): Observable<{ id: number, IDRol: number, token: string }> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    console.log("URL completa del servicio:", url); // Log para verificar la URL
    return this.http.post<{ id: number, IDRol: number, token: string }>(url, usuario);
  }
  
}
