import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEComponent } from './pages/home-e/home-e.component';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { ListaSucursalComponent } from './pages/sucursal-e/lista-sucursal/lista-sucursal.component';
import { ListaJuegoComponent } from './pages/juego-e/lista-juego/lista-juego.component';
import { InfoJuegoComponent } from './pages/juego-e/info-juego/info-juego.component';

import { ListaProductoComponent } from './pages/producto-e/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './pages//producto-e/nuevo-producto/nuevo-producto.component';
import { ListaVentaComponent } from './pages/venta/lista-venta/lista-venta.component';
import { NuevaVentaComponent } from './pages/venta/nueva-venta/nueva-venta.component';


const routes: Routes = [
  {
    path: '',
    component:LayoutPagesComponent,
    children: [

    {path:'home-e',component:HomeEComponent},
    {
      path: 'juegos-e',component:ListaJuegoComponent
    },
    {
     path:'juego-e',component:InfoJuegoComponent
    },
    {
      path:'juego-e/:id',component:InfoJuegoComponent
     },
    {
      path:'sucursales-e',component:ListaSucursalComponent
    },
    {path:'ventas-e',component:ListaVentaComponent},
    {path:'venta-e',component:NuevaVentaComponent},
    {path:'venta-e-edit/:id',component:NuevaVentaComponent},

    {
      path:'productos-e',component:ListaProductoComponent
    },
    {path:'add',component:NuevoProductoComponent},
    {path:'edit/:id',component:NuevoProductoComponent},
    {
      path: '',
      redirectTo: 'home-e',
      pathMatch: 'full'
    }

    //path 'crearventa/:idv, component:CrearVentaComponent'
    //Uso para la base de datos(?)
    //path: ':idv', component: ventaComponent
    //path 'crearjuego/:idj', component:JuegoComponent
    //path: 'idj', component:JuegosComponent
    //path 'crearPlatillo/:id', component:PlatillosComponent
    //path: ':idp', component:NuevosPlatillosComponent
    //path ''

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoPRoutingModule { }
