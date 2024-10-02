import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../interfaces/producto';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-lista-menu',
  templateUrl: './lista-menu.component.html',
  styles: ``
})
export class ListaMenuComponent implements OnInit {
  ListProducto: Producto[] = []
  constructor(private _productService: ProductoService,
  ) { }
  ngOnInit(): void {
    this.getListProducts();
  }
  getListProducts(){
    this._productService.getListProducts().subscribe((data:Producto[])=> {
      this.ListProducto = data;
    })
  }

}
