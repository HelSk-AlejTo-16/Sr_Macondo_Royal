import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Juego } from '../interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/juegos/';
  }

  getListJuego (): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteJuego (id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveJuego (juego: Juego): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, juego);
  }

  getJuego (id: number): Observable<Juego>{
    return this.http.get<Juego>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateJuego (id: number, juego: Juego): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, juego);
  }
  updateDisponibiladJuego(id: number, Dispon_Jueg: boolean): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}/dispon_jueg`,{Dispon_Jueg});
  }
}


