import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../../interfaces/juego';
import { JuegoService } from '../../../../services/juego.service';

@Component({
  selector: 'app-lista-juego',
  templateUrl: './lista-juego.component.html',
})
export class ListaJuegoComponent implements OnInit {

  ListJuego: Juego[] = []

  constructor(
    private _juegoService: JuegoService
  ) { }
  ngOnInit(): void{
    this.getListJuego();
  }
  

  getListJuego(){
    this._juegoService.getListJuego().subscribe((data:Juego[])=> {
      this.ListJuego = data;
  })
 
  
}
}
