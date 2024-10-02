import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Notas } from '../interfaces/notas';


@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Notas/';
  }

  getListNotas (): Observable<Notas[]> {
    return this.http.get<Notas[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteNota (id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveNota (nota: Notas): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, nota);
  }

  getNota (id: number): Observable<Notas>{
    return this.http.get<Notas>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateNota (id: number, nota: Notas): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, nota);
  }
}
