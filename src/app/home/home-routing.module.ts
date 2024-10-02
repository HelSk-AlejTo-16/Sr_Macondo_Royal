import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AvisameComponent } from './pages/avisame/avisame.component';
import { ListaSucursalComponent } from './pages/listas/lista-sucursal/lista-sucursal.component';
import { ListaJuegoComponent } from './pages/listas/lista-juego/lista-juego.component';
import { ListaProductoComponent } from './pages/listas/lista-producto/lista-producto.component';
import { ListaMenuComponent } from './pages/listas/lista-menu/lista-menu.component';
import { MapaComponent } from './pages/mapa/mapa.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tienda',
        component: TiendaComponent
      },
      {
        path:  'acerca-de',
        component: AcercaDeComponent
      },
      {
        path:  'avisame',
        component: AvisameComponent
      },
      {
        path:  'sucursales',
        component: ListaSucursalComponent
      },
      {
        path:  'juegos',
        component: ListaJuegoComponent
      },
      {
        path:  'productos',
        component: ListaProductoComponent
      },
      {
        path:  'menu',
        component: ListaMenuComponent
      },
    {
      path: 'mapa',
      component: MapaComponent
    },
      {
        path: '',
        redirectTo: 'tienda',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
