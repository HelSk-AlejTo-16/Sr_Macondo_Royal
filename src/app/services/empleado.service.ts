import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/empleados/';
  }

  getListEmpleado (): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteEmpleado (id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveEmpleado (empleado: Empleado): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,empleado);
  }

  getEmpleado (id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateEmpleado (id: number, empleado: Empleado): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, empleado);
  }

  updateEstadoEmpleado(id: number, estado: boolean): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}/estado`, { estado });
  }

}
