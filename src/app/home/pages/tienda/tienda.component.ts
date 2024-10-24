import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto.service';
import { Sucursal } from '../../../interfaces/sucursal';
import { SucursalService } from '../../../services/sucursal.service';
import { Juego } from '../../../interfaces/juego';
import { JuegoService } from '../../../services/juego.service';
import { FacebookService } from '../../../services/facebook-sdk.service';  // Importa el servicio de Facebook
import { CorreoService } from '../../../services/correo.service';
import { Correo } from '../../../interfaces/correo';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styles: ``
})
export class TiendaComponent implements OnInit {
  ListProducto: Producto[] = [];
  ListSucursal: Sucursal[] = [];
  ListJuego: Juego[] = [];
  userData: any = null;  // Para almacenar los datos del usuario de Facebook

  constructor(
    private _productService: ProductoService,
    private _sucursalService: SucursalService,
    private _juegoService: JuegoService,
    private _facebookService: FacebookService,  // Inyección del servicio de Facebook
    private _correoService: CorreoService
  ) { }

  ngOnInit(): void {
    // Cargar listas de productos, sucursales y juegos
    this.getListProducts();
    this.getListSucursal();
    this.getListJuego();

    // Inicializar el SDK de Facebook
    this._facebookService.loadFBSDK();
  }

  // Método para iniciar sesión con Facebook
  loginWithFacebook() {
    this._facebookService.login().then((authResponse: any) => {
      console.log('Logged in successfully!', authResponse);
      this.getFacebookUserData();
    }).catch(error => {
      console.error('Error logging in with Facebook', error);
    });
  }

  // Método para obtener los datos del usuario de Facebook
  getFacebookUserData() {
    this._facebookService.getUserData().then((userData: any) => {
      console.log('User data retrieved from Facebook', userData);
      this.userData = userData;  // Guardar los datos del usuario
    if(userData.email){
      this.storeUserEmail(userData.email);
    }
    
    }).catch(error => {
      console.error('Error getting user data from Facebook', error);
    });
  }

  storeUserEmail(email: string) {
    const correo: Correo = { Correo_Electronico: email };  // Usar la propiedad correcta definida en la interfaz
    this._correoService.saveCorreo(correo).subscribe(
      () => {
        console.log('Email almacenado exitosamente');
      },
      error => {
        console.error('Error al almacenar el email', error);
      }
    );
  }

  // Métodos existentes para obtener productos, sucursales y juegos
  getListProducts() {
    this._productService.getListProducts().subscribe((data: Producto[]) => {
      this.ListProducto = data;
    });
  }

  getListSucursal() {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.ListSucursal = data;
    });
  }

  getListJuego() {
    this._juegoService.getListJuego().subscribe((data: Juego[]) => {
      this.ListJuego = data;
    });
  }
}
