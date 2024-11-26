import { Component, AfterViewInit, viewChild, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Map,Popup,Marker } from 'mapbox-gl';
import { MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement !: ElementRef

  constructor(private PlacesService: PlacesService,
    private mapService: MapService
  ){

  }
ngAfterViewInit(): void {
  if(!this.PlacesService.userLocation) throw Error ('No hay placesService.userLocation');
  const map = new Map({
    container: this.mapDivElement.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.PlacesService.userLocation, // starting position [lng, lat]
    zoom: 15, // starting zoom
  });
    const popup = new Popup()
    .setHTML(`
      <h6>Posicion Actual</h6>
      <span>Estoy en busca del Sr.Macondo... El restaurante más maravilloso del mundo.</span>`);

  new Marker({color:'red'})
  .setLngLat(this.PlacesService.userLocation)
  .setPopup(popup)
  .addTo(map)

  this.mapService.setMap(map);
}
}
