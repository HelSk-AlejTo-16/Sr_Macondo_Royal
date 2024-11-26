import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private clientId = 'a9b80a8663784690b3102718e2e1cfb0';
  private redirectUri = 'http://localhost:4200/sr-macondo/callback';
  private scope = 'user-read-private user-read-email playlist-modify-private';

  constructor() {}

  getLoginUrl() {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    return authUrl;
  }

  setAccessToken(token: string) {
    spotifyApi.setAccessToken(token);
  }

  searchTrack(query: string) {
    return spotifyApi.searchTracks(query);
  }

  addTrackToPlaylist(playlistId: string, trackUri: string): Promise<void> {
    return new Promise((resolve, reject) => {
      spotifyApi.addTracksToPlaylist(playlistId, [trackUri], (error: { message?: string, status?: number }) => {
        if (error) {
          // Manejo del error mejorado para capturar información relevante
          let errorMsg = error.message || 'Error desconocido';
          const statusCode = error.status || 'Sin código de estado';
          console.error(`Error al agregar la canción: ${errorMsg} (Código de estado: ${statusCode})`);
          reject(`Error al agregar la canción: ${errorMsg} (Código de estado: ${statusCode})`);
        } else {
          resolve();
        }
      });
    });
  }
}