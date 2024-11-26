import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  errorMessage: string = '';
  weatherIconClass: string = '';
  weatherIconSrc: string = '';

  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) {}

  getWeather() {
    if (!this.city.trim()) {
      this.errorMessage = 'Por favor, ingresa el nombre de una ciudad';
      return;
    }

    this.weatherService.getWeatherByCity(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        this.errorMessage = '';
        this.setWeatherIcon(data.weather[0].main.toLowerCase());
        console.log('Weather Icon Path:', this.weatherIconSrc);
      },
      (error) => {
        this.errorMessage = 'No se pudo obtener el clima. Verifica el nombre de la ciudad.';
        this.weatherData = null;
        this.weatherIconClass = '';
        this.weatherIconSrc = '';
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/sr-macondo/tienda']);
  }

  handleImageError(event: any) {
    console.log('Image failed to load:', this.weatherIconSrc);
    event.target.style.display = 'none';
  }

  private setWeatherIcon(weatherMain: string) {
    console.log('Setting weather icon for:', weatherMain);
    
    const basePath = 'assets/weather-icons';
    
    switch (weatherMain) {
      case 'clear':
        this.weatherIconClass = 'weather-icon sunny';
        this.weatherIconSrc = `${basePath}/sunny.svg`;
        break;
      case 'clouds':
        this.weatherIconClass = 'weather-icon cloudy';
        this.weatherIconSrc = `${basePath}/cloudy.svg`;
        break;
      case 'rain':
        this.weatherIconClass = 'weather-icon rainy';
        this.weatherIconSrc = `${basePath}/rainy.svg`;
        break;
      case 'thunderstorm':
        this.weatherIconClass = 'weather-icon thunder';
        this.weatherIconSrc = `${basePath}/thunder.svg`;
        break;
      case 'snow':
        this.weatherIconClass = 'weather-icon snowy';
        this.weatherIconSrc = `${basePath}/snowy.svg`;
        break;
      case 'mist':
      case 'fog':
        this.weatherIconClass = 'weather-icon foggy';
        this.weatherIconSrc = `${basePath}/foggy.svg`;
        break;
      default:
        this.weatherIconClass = 'weather-icon partly-cloudy';
        this.weatherIconSrc = `${basePath}/partly-cloudy.svg`;
    }
    
    console.log('Set weather icon path to:', this.weatherIconSrc);
  }
}