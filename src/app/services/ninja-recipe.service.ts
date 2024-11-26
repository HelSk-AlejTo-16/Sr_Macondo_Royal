import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para tipar la respuesta
export interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiKey = 'KeRIH7gp+oS4iM3gX4wN6Q==mcWjNrNranAC7LAF'; // Reemplaza con tu API key
  private apiUrl = 'https://api.api-ninjas.com/v1/recipe';

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<Recipe[]> {
    const headers = new HttpHeaders()
      .set('X-Api-Key', this.apiKey)
      .set('Content-Type', 'application/json');

    return this.http.get<Recipe[]>(this.apiUrl, {
      headers: headers,
      params: { query: query }
    });
  }

  // Método para obtener una receta aleatoria
  getRandomRecipe(): Observable<Recipe[]> {
    const randomQueries = ['chicken', 'beef', 'fish', 'vegetarian', 'pasta', 'salad'];
    const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
    return this.searchRecipes(randomQuery);
  }

  // Método para buscar por ingrediente específico
  searchByIngredient(ingredient: string): Observable<Recipe[]> {
    return this.searchRecipes(ingredient);
  }
}