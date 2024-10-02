import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../../../interfaces/sucursal';
import { SucursalService } from '../../../../services/sucursal.service';

@Component({
  selector: 'app-lista-sucursal',
  templateUrl: './lista-sucursal.component.html',
  styles: ``
})
export class ListaSucursalComponent implements OnInit{
  listSucursal: Sucursal[] = []

  constructor(private _sucursalService: SucursalService) {}

  ngOnInit(): void {
    this.getListSucursal();
  }

  getListSucursal () {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.listSucursal = data;
    })
  }
}
