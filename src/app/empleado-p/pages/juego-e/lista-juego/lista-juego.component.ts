import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../../interfaces/juego';
import { JuegoService } from '../../../../services/juego.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-juego',
  templateUrl: './lista-juego.component.html',
  styles: ``
})
export class ListaJuegoComponent implements OnInit{

  listJuego: Juego[] = [];
  id: number;

  constructor(private _juegoServices: JuegoService,
    private toastr: ToastrService,
  ) {
    this.id = Number(localStorage.getItem('id'));
  }

  ngOnInit(): void {
    this.getListJuego();
  }

  getListJuego () {
    this._juegoServices.getListJuego().subscribe((data: Juego[]) => {
      this.listJuego = data;
    })
  }

  deleteJuego (id: number) {
    this._juegoServices.deleteJuego(id).subscribe(() => {
      this.getListJuego();
    })
  }
  marcarOcupado(id: number) {
    this._juegoServices.updateDisponibiladJuego(id, true).subscribe({
      next: () => {
        this.toastr.info('El juego se ha marcado como Ocupado', 'Cambio de estado');
        this.getListJuego(); // Para refrescar la lista con los cambios
      },
      error: (error) => {
        console.error('Error al marcar como Ocupado:', error);
      }
    });
  }
  
  marcarDesocupado(id: number) {
    this._juegoServices.updateDisponibiladJuego(id, false).subscribe({
      next: () => {
        this.toastr.warning('El juego se ha marcado como Desocupado', 'Cambio de estado');
        this.getListJuego(); // Para refrescar la lista con los cambios
      },
      error: (error) => {
        console.error('Error al marcar como Desocupado:', error);
      }
    });
  }
}
