import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../interfaces/producto';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styles: ``
})
export class ListaProductoComponent implements OnInit{
  ListProducto: Producto[] = []
  constructor(private _productService: ProductoService,
  ) { }
  ngOnInit(): void{
    this.getListProducts();

  }

  getListProducts(){
    this._productService.getListProducts().subscribe((data:Producto[])=> {
      this.ListProducto = data;
    })
  }
}
