import { Component } from '@angular/core';
import { RecipeService, Recipe } from '../../../../services/ninja-recipe.service';
import { MyMemoryTranslateService } from '../../../../services/MyMemoryTranslateService.service';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './menu.component.html'
})
export class ListaMenuuComponent {
  recipes: Recipe[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string = '';
  private translationCache: { [key: string]: string } = {};

  constructor(private recipeService: RecipeService, private translateService: MyMemoryTranslateService) {}

  searchRecipes(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.error = '';

      this.recipeService.searchRecipes(this.searchTerm)
        .subscribe({
          next: (data) => {
            this.recipes = data;
            this.translateRecipes(this.recipes);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error:', error);
            this.error = 'Ocurrió un error al buscar las recetas. Por favor, intenta de nuevo.';
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }
  }

  private translateRecipes(recipes: Recipe[]): Promise<void> {
    const translationPromises = recipes.map(recipe => {
      const cachedTitle = this.translationCache[recipe.title];
      if (cachedTitle) {
        recipe.title = cachedTitle;
        return Promise.resolve();
      }

      return this.translateService.translateText(recipe.title).toPromise()
        .then(response => {
          const translatedTitle = response.responseData.translatedText;
          recipe.title = translatedTitle;
          this.translationCache[recipe.title] = translatedTitle;
          
          return this.translateService.translateText(recipe.ingredients).toPromise().then(responseIngredients => {
            recipe.ingredients = responseIngredients.responseData.translatedText;
            this.translationCache[recipe.ingredients] = responseIngredients.responseData.translatedText;

            return this.translateService.translateText(recipe.instructions).toPromise().then(responseInstructions => {
              recipe.instructions = responseInstructions.responseData.translatedText;
              this.translationCache[recipe.instructions] = responseInstructions.responseData.translatedText;
            });
          });
        })
        .catch(error => {
          console.error('Error en la traducción:', error);
          recipe.title = `Error al traducir el título: ${recipe.title}`;
          recipe.ingredients = 'Error al traducir los ingredientes.';
          recipe.instructions = 'Error al traducir las instrucciones.';
          return Promise.resolve();
        });
    });

    return Promise.all(translationPromises).then(() => {
      this.loading = false;
    }).catch(error => {
      console.error('Error en la traducción:', error);
      this.error = 'Error al traducir las recetas.';
      this.loading = false;
    });
  }
  private translateLargeText(text: string): Promise<string[]> {
    const MAX_LENGTH = 500; // Límite de caracteres para cada solicitud
    const parts = [];
    let startIndex = 0;
  
    while (startIndex < text.length) {
      // Divide el texto en partes de hasta 500 caracteres
      let endIndex = Math.min(startIndex + MAX_LENGTH, text.length);
      parts.push(text.slice(startIndex, endIndex));
      startIndex = endIndex;
    }
  
    // Traduce cada parte individualmente y combina los resultados
    return Promise.all(parts.map(part => this.translateService.translateText(part).toPromise()));
  }
  
}
