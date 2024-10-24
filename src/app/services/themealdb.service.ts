import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemealdbService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getMealById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  searchMeals(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?s=${query}`);
  }

  getRandomMeal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random.php`);
  }
}
