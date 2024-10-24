import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {

    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

    constructor(handler: HttpHandler) {
        super(handler);
    }
    
    public override get<T>(url: string) {     
        url = this.baseUrl + url;

        return super.get<T>(url, {
            params: {
                alternatives: 'false',          // Cambiado a string
                geometries: 'geojson',
                language: 'es',                 // Corregido 'languaje' a 'language'
                overview: 'simplified',         // Corregido 'smplified' a 'simplified'
                steps: 'false',                // Cambiado a string
                access_token: environment.apiKey
            }
        });
    }
}