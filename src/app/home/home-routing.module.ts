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
import { CallbackComponent } from './pages/callback/callback.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { PrincipalComponent } from '../components/principal/principal.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { VideoListComponent } from '../components/video-list/video-list.component';
import { InstagramFeedComponent } from '../components/instagram-feed/instagram-feed.component';
import { MensajesComponent } from '../pages/mensajes/mensajes.component';
import { WhatsappFormComponent } from '../components/whatsapp-form/whatsapp-form.component';
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
        path: 'instagram',
        component: InstagramFeedComponent
      },
    {
      path: 'mapa',
      component: MapaComponent
    },
    {
      path: 'callback',
      component: CallbackComponent

    },
    {
      path: 'chatbot',
      component: ChatbotComponent
    },{
      path: 'pago',
      component: PrincipalComponent
    },
    {
      path: 'weather',
      component: WeatherComponent
    },
    {
      path: 'videos',
      component: VideoListComponent
    },
    {
      path: 'mensajes',
      component: MensajesComponent
    },
    {
      path: 'whatsapp',
      component: WhatsappFormComponent
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
