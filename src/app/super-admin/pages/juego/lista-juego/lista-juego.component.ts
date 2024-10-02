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

  listJuego: Juego[] = []

  constructor(private _juegoServices: JuegoService, private toastr: ToastrService) {}

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
      this.toastr.warning('El juego ha sido eliminado con exito','Advertencia')
      this.getListJuego();
    })
  }
}
