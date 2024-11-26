import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  query = '';
  tracks: any[] = [];
  token: string | null = null;
  playlistId = '2yR6PBZjVGZS3illlHi1Ca'; // Cambiado a solo el ID de la playlist

  constructor(private spotifyAuth: SpotifyAuthService) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  handleCallback() {
    const hash = window.location.hash;
    this.token = hash ? hash.split('&')[0].split('=')[1] : null;

    if (this.token) {
      this.spotifyAuth.setAccessToken(this.token);
      window.location.hash = ''; // Limpiar la URL después de obtener el token
    } else {
      this.redirectToSpotifyLogin();
    }
  }

  redirectToSpotifyLogin() {
    const authUrl = this.spotifyAuth.getLoginUrl();
    window.location.href = authUrl;
  }

  search() {
    if (this.token) {
      this.spotifyAuth.searchTrack(this.query).then(response => {
        this.tracks = response.tracks.items;
      });
    } else {
      alert('Por favor, inicia sesión en Spotify.');
    }
  }

  addTrack(trackUri: string) {
    if (!this.playlistId) {
      alert('Primero, configura el ID de tu playlist.');
      return;
    }

    this.spotifyAuth.addTrackToPlaylist(this.playlistId, trackUri)
      .then(() => {
        alert('¡Canción agregada a la playlist!');
      })
      .catch((error) => {
        console.error('Error al agregar la canción:', error);
        alert('Hubo un problema al agregar la canción: ' + error); // Usar el error directamente
      });
  }
}
