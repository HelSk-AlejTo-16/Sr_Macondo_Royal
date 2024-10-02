import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlbGVvMTgiLCJhIjoiY20xZ3FlNXdiMDZqcjJrcG93Mndub2w2eSJ9.x3BQvkHb-poOSbmNCEk4Yg';


if ( !navigator.geolocation){
  alert('Geolocation is not supported by your browser');
  throw new Error('El navegador no soporta la geolocalización');
}
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
