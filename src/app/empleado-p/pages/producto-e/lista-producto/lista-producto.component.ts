import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../interfaces/producto';
import { ProductoService } from '../../../../services/producto.service';
import { SucursalService } from '../../../../services/sucursal.service';

import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sucursal } from '../../../../interfaces/sucursal';
import { distribuidors } from '../../../../interfaces/distribuidors';
import { distribuidorsService } from '../../../../services/distribuidors.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styles: ``
})
export class ListaProductoComponent implements OnInit {
  ListProducto: Producto[] = [];
  sucursalesMap: { [key: string]: string } = {};
  distribuidoresMap: { [key: string]: string } = {};

  constructor(
    private _productService: ProductoService,
    private _sucursalService: SucursalService,
    private _distribuidorService: distribuidorsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getListProducts();
    this.getListSucursales();
    this.getListDistribuidores();
  }

  getListProducts() {
    this._productService.getListProducts().subscribe((data: Producto[]) => {
      this.ListProducto = data;
    });
  }

  getListSucursales() {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      data.forEach(sucursal => {
        this.sucursalesMap[sucursal.id!] = sucursal.Nom_Suc;
      });
    });
  }

  getListDistribuidores() {
    this._distribuidorService.getdistribuidors().subscribe((data: distribuidors[]) => {
      data.forEach(distribuidor => {
        this.distribuidoresMap[distribuidor.id!] = distribuidor.Nom_Distr;
      });
    });
  }

  deleteProduct(id: string) {
    this._productService.deletedProduct(id).subscribe(data => {
      console.log(data);
      this.getListProducts();

      this._snackBar.open('Venta Eliminada con exito', 'Cerrar', {
        duration: 3000,
      });
    });
  }
}
