import { Component, OnInit } from '@angular/core';
import { ThemealdbService } from '../../../../services/themealdb.service';


@Component({
  selector: 'app-meal',
  templateUrl: './menu.component.html',
  
})
export class ListaMenuuComponent  {
  meals: any[] = [];
  searchTerm: string = '';  // Variable para el término de búsqueda

  constructor(private themealdbService: ThemealdbService) {}

  // Método para buscar recetas basado en el término de búsqueda
  searchMeals(): void {
    if (this.searchTerm.trim()) {
      this.themealdbService.searchMeals(this.searchTerm).subscribe((data) => {
        this.meals = data.meals || [];
      });
    } else {
      this.meals = [];
    }
  }
}