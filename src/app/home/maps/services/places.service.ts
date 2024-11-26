import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../../interfaces/places';
import { PlaceApiClient } from '../api';
import { MapService } from '.';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlaceApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if (!this.userLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
    .pipe(
      catchError(error => {
        console.error('Error fetching places:', error);
        // Devolver un objeto que coincida con la interfaz PlacesResponse
        return of({
          type: 'FeatureCollection',
          query: [],
          features: [],
          attribution: 'Error fetching places'
        } as PlacesResponse);
      }),
      map(resp => {
        // Validar y filtrar lugares con coordenadas válidas
        return {
          ...resp,
          features: resp.features.filter(feature => {
            return Array.isArray(feature.center) && 
                   feature.center.length === 2 && 
                   !feature.center.some(isNaN) &&
                   typeof feature.center[0] === 'number' && 
                   typeof feature.center[1] === 'number';
          })
        };
      })
    )
    .subscribe(resp => {
      this.isLoadingPlaces = false;
      this.places = resp.features;

      if (this.userLocation && Array.isArray(this.userLocation) && 
          this.userLocation.length === 2 && 
          !this.userLocation.some(isNaN)) {
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation);
      }
    });
  }

  deletePlaces() {
    this.places = [];
  }
}