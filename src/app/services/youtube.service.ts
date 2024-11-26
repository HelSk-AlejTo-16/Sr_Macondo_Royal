import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(
    private http: HttpClient,
     @Inject('YOUTUBE_API_KEY') private apiKey: string
  ) { }

  searchRecipes(query: string = 'recetas de cocina casera', maxResults: number = 12): Observable<any> {
    const url = `${this.apiUrl}/search?key=${this.apiKey}&q=${query}&part=snippet&type=video&maxResults=${maxResults}&relevanceLanguage=es&videoCategoryId=26`;
    return this.http.get(url).pipe(
      map((response: any) => response.items)
    );
  }

  getPopularRecipes(): Observable<any> {
    return this.searchRecipes('recetas de cocina fáciles paso a paso');
  }

  getCategoryRecipes(category: string): Observable<any> {
    return this.searchRecipes(`recetas ${category}`);
  }
}