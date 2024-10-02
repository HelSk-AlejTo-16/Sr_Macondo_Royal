import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Dato } from '../interfaces/dato';

@Injectable({
  providedIn: 'root'
})
export class EditAcercaDeService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/datos/';
  }

  getDato (id: number): Observable<Dato>{
    return this.http.get<Dato>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateDato (id: number, dato: Dato): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, dato);
  }
}
