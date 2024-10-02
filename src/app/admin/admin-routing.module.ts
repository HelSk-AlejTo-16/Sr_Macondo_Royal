import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalSaComponent } from './pages/principal-sa/principal-sa.component';
import { LayoutSaComponent } from './pages/layout-sa/layout-sa.component';

import { NuevoNotasComponent } from './pages/notas/nuevo-notas/nuevo-mensaje.component';
import { ListaNotaComponent } from './pages/notas/listas-notas/lista-notas.component';
import { ListaDistribuidorComponent } from './pages/distribuidor/lista-distribuidor/lista-distribuidor.component';
import { NuevoDistribuidorComponent } from './pages/distribuidor/nuevo-distribuidor/nuevo-distribuidor.component';






const routes: Routes = [
  {
    path: '',
    component: LayoutSaComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalSaComponent
      },


      //Craga a los componentes de juegos
      {
        path: 'mensajes' ,
        component: ListaNotaComponent
      },
      {
        path: 'mensaje/:id' ,
        component: NuevoNotasComponent
      },
      {
        path: 'nuevo-mensaje' ,
        component: NuevoNotasComponent
      },

      //Carga los componentes de probedores

      {
        path: 'distribuidores',
        component: ListaDistribuidorComponent
      },
      {
        path: 'distribuidor/:id',
        component: NuevoDistribuidorComponent
      },
      {
        path: 'nuevo-distribuidor',
        component: NuevoDistribuidorComponent
      },


      //Carga a los componentes de sucursal

      //Lo que siempre carga aunque no se escriba nada
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
