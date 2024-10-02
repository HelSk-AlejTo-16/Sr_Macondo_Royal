import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Pipe({
  name: 'filterProductsByType'
})
export class FilterProductsByTypePipe implements PipeTransform {

  transform(products: Producto[], typeId: number): Producto[] {
    if (!products || products.length === 0) {
      return [];
    }

    return products.filter(product => Number(product.Tipo_Prod) === typeId);
  }

  transformImage(producto: Producto): string {
    if (!producto.id && !producto.Link_img) {
      return 'assets/no-image.png';
    }
    if (producto.Link_img) return producto.Link_img;
    return `assets/heroes/${producto.id}.jpg`;
  }
}
