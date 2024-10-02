import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Venta } from '../interfaces/venta';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/ventas/';
  }

  getListVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveVenta(venta: Venta): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, venta).pipe(
      catchError(this.handleError)
    );
  }

  getVenta(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.myAppUrl}${this.myApiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateVenta(id: number, venta: Venta): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, venta).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
