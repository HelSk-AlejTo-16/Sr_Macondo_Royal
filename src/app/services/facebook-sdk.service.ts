import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() {
    this.loadFBSDK();
  }

  loadFBSDK() {
    if ((window as any).FB) {
      return;  // Si ya está cargado, no lo cargues de nuevo
    }

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => this.initFB();
    document.body.appendChild(script);
  }

  initFB() {
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        appId: '1053068579592012',  // Asegúrate de que este sea tu App ID correcto
        cookie: true, // Habilitar cookies para gestionar la sesión
        xfbml: true,
        version: 'v21.0'
      });
      console.log('Facebook SDK inicializado');
    };
  }

  // Método para iniciar sesión con Facebook
  login() {
    return new Promise((resolve, reject) => {
      (window as any).FB.login((response: any) => {
        if (response.authResponse) {
          resolve(response.authResponse);
        } else {
          reject('No se pudo iniciar sesión en Facebook');
        }
      }, { scope: 'public_profile,email' });  // Permisos solicitados
    });
  }

  // Método para obtener los datos del perfil del usuario
  getUserData() {
    return new Promise((resolve, reject) => {
      (window as any).FB.api('/me', { fields: 'id,name,email,picture' }, (response: any) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  }
}
