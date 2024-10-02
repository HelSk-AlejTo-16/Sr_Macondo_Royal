import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { distribuidors } from '../interfaces/distribuidors';



@Injectable({
  providedIn: 'root'
})
export class distribuidorsService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/distribuidors/';
  }

  getdistribuidors(): Observable<distribuidors[]> {
    return this.http.get<distribuidors[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  deletedistribuidor (id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveDistribuidor (distribuidors: distribuidors): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,distribuidors);
  }

  getDistribuidor(id: number): Observable<distribuidors>{
    return this.http.get<distribuidors>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateDistribuidor (id: number, distribuidors: distribuidors): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, distribuidors);
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
