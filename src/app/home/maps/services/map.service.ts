import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../../interfaces/directions';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApiClient) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    if (!coords || !Array.isArray(coords) || coords.length !== 2) return;

    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Mapa no inicializado');
    if (!places || !Array.isArray(places)) return;
    if (!userLocation || !Array.isArray(userLocation) || userLocation.length !== 2) return;

    // Limpiar marcadores existentes
    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    // Crear bounds
    const bounds = new LngLatBounds();

    // Extender bounds con la ubicación del usuario si es válida
    if (!isNaN(userLocation[0]) && !isNaN(userLocation[1])) {
      bounds.extend(userLocation);
    }

    // Crear nuevos marcadores
    for (const place of places) {
      if (!place.center || !Array.isArray(place.center) || place.center.length !== 2) continue;
      
      const [lng, lat] = place.center;
      if (isNaN(lng) || isNaN(lat)) continue;

      const popup = new Popup()
        .setHTML(`
          <h6>${place.text || ''}</h6>
          <span>${place.place_name || ''}</span>
        `);

      const newMarker = new Marker({ color: 'red' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
      bounds.extend([lng, lat]);
    }

    this.markers = newMarkers;

    // Solo ajustar el mapa si hay bounds válidos y no están vacíos
    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds, {
        padding: 200,
        maxZoom: 15
      });
    }
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    if (!start || !end || !Array.isArray(start) || !Array.isArray(end)) return;
    if (start.length !== 2 || end.length !== 2) return;
    if (start.some(isNaN) || end.some(isNaN)) return;

    // Limpiar ruta anterior si existe
    if (this.map?.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    console.log('Requesting route between:', start, end);

    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .pipe(
        catchError(error => {
          console.error('Error getting directions:', error);
          return of(null);
        })
      )
      .subscribe(resp => {
        if (resp && resp.routes && resp.routes.length > 0) {
          this.drawPolyline(resp.routes[0]);
        } else {
          console.log('No valid route received');
        }
      });
  }

  private drawPolyline(route: Route) {
    if (!this.map) throw Error('El mapa no esta inicializado');
    if (!route || !route.geometry || !route.geometry.coordinates) return;

    const coords = route.geometry.coordinates;
    if (!coords.length) return;

    // Crear bounds
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      if (!isNaN(lng) && !isNaN(lat)) {
        bounds.extend([lng, lat]);
      }
    });

    // Preparar datos de la ruta
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    // Agregar nueva ruta
    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#3388ff',
        'line-width': 4
      }
    });

    // Ajustar el mapa para mostrar toda la ruta
    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }
}