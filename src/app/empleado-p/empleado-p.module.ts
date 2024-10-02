import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoPRoutingModule } from './empleado-p-routing.module';

import { HomeEComponent } from './pages/home-e/home-e.component';

import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { MaterialModule } from '../material/material.module';


import { ListaJuegoComponent } from './pages/juego-e/lista-juego/lista-juego.component';
import { InfoJuegoComponent } from './pages/juego-e/info-juego/info-juego.component';

import { ListaSucursalComponent } from './pages/sucursal-e/lista-sucursal/lista-sucursal.component';

import { ListaProductoComponent } from './pages/producto-e/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './pages/producto-e/nuevo-producto/nuevo-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


import { ListaVentaComponent } from './pages/venta/lista-venta/lista-venta.component';
import { NuevaVentaComponent } from './pages/venta/nueva-venta/nueva-venta.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SucursalImagePipe } from '../pipes/sucursal-image.pipe';






@NgModule({
  declarations: [
    
    HomeEComponent,
    LayoutPagesComponent,
    
    ListaJuegoComponent,
    InfoJuegoComponent,
    ListaSucursalComponent,
  
    ListaProductoComponent,
    NuevoProductoComponent,
    ListaVentaComponent,
    NuevaVentaComponent,
    SucursalImagePipe
  
    
    
    
    
    
    

   
  ],
  imports: [
    CommonModule,
    EmpleadoPRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule
    
  ]
})
export class EmpleadoPModule { }
