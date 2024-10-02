import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/roles/';
  }

  getListRol (): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getRol (id: number): Observable<Rol>{
    return this.http.get<Rol>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

}
