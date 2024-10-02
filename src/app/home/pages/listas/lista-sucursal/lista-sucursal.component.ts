import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../../../services/sucursal.service';
import { Sucursal } from '../../../../interfaces/sucursal';

@Component({
  selector: 'app-lista-sucursal',
  templateUrl: './lista-sucursal.component.html',
  styles: ``
})
export class ListaSucursalComponent implements OnInit{
  ListSucursal: Sucursal[] = []

  constructor(
    private _sucursalService: SucursalService,

  ) { }
  ngOnInit(): void{
this.getListSucursal();
  }

  getListSucursal(){
    this._sucursalService.getListSucursal().subscribe((data:Sucursal[])=> {
      this.ListSucursal = data;
    })
  }

}
