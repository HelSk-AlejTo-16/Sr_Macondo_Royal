import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { MaterialModule } from '../material/material.module';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AvisameComponent } from './pages/avisame/avisame.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ProductoImagePipe } from '../pipes/producto-image.pipe';
import { SucursalImagePipe2 } from '../pipes/sucursal2-image.pipe';
import { JuegoImagePipe } from '../pipes/juegos-image.pipe';

import { ListaSucursalComponent } from './pages/listas/lista-sucursal/lista-sucursal.component';
import { ListaProductoComponent } from './pages/listas/lista-producto/lista-producto.component';
import { ListaJuegoComponent } from './pages/listas/lista-juego/lista-juego.component';
import { ListaMenuComponent } from './pages/listas/lista-menu/lista-menu.component';
import { FilterProductsByTypePipe } from '../pipes/filterProductsByType.pipe';
import { MapaComponent } from './pages/mapa/mapa.component';
import { MapsModule } from "../maps/maps.module";


@NgModule({
  declarations: [
    LayoutComponent,
    TiendaComponent,
    AcercaDeComponent,
    AvisameComponent,
    ListaComponent,
    ProductoImagePipe,
    SucursalImagePipe2,
    JuegoImagePipe,
    ListaSucursalComponent,
    ListaProductoComponent,
    ListaJuegoComponent,
    ListaMenuComponent,
    FilterProductsByTypePipe,
    MapaComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    MapsModule
]
})
export class HomeModule { }
