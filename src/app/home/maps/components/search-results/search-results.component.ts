import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  public selectedId: string = '';

  constructor(
    private placeService: PlacesService,
    private mapService: MapService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placeService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placeService.places;
  }

  flyTo(place: Feature) {
    if (!place.center || !Array.isArray(place.center) || place.center.length !== 2) return;
    
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    
    if (!isNaN(lng) && !isNaN(lat)) {
      this.mapService.flyTo([lng, lat]);
    }
  }

  getDirections(place: Feature) {
    if (!this.placeService.userLocation) {
      console.error('No hay ubicación del usuario');
      return;
    }

    if (!place.center || !Array.isArray(place.center) || place.center.length !== 2) {
      console.error('Coordenadas del destino inválidas');
      return;
    }

    const start = this.placeService.userLocation;
    const end = place.center as [number, number];

    if (start.some(isNaN) || end.some(isNaN)) {
      console.error('Coordenadas inválidas', { start, end });
      return;
    }

    this.placeService.deletePlaces();
    this.mapService.getRouteBetweenPoints(start, end);
  }
}