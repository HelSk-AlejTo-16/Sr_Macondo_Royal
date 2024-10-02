import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoService } from '../../../../services/juego.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Juego } from '../../../../interfaces/juego';
import { Notas } from '../../../../interfaces/notas';
import { NotasService } from '../../../../services/nota.service';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './lista-notas.component.html',
  styles: ``
})
export class ListaNotaComponent implements OnInit{
    ListNotas: Notas[] = []
  
    constructor(private _notasService: NotasService) {}

    ngOnInit(): void {
      this.getListNota();
    }
  
    getListNota() {
      this._notasService.getListNotas().subscribe((data: Notas[]) => {
        this.ListNotas = data;
      });
    }
  
    deleteNota(id: number) {
      this._notasService.deleteNota(id).subscribe(() => {
        this.getListNota();
      });
    }
  }


