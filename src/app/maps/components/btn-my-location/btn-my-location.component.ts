import { Component } from '@angular/core';
import { MapService } from '../../services';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {
constructor(
  private mapService: MapService,
  private PlacesService: PlacesService

){

}
goToMyLocation(){
  if (!this.PlacesService.isUserLocationReady)throw Error('No hay ubicación de usuario');
  if(!this.mapService.isMapReady)throw Error('No hay mapa disponible');

  this.mapService.flyTo(this.PlacesService.userLocation!);
}
}
