import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Pipe({
  name: 'productoImage'
})
export class ProductoImagePipe implements PipeTransform {

  transform(producto: Producto ): string {
    if(!producto.id && !producto.Link_img){
      return 'assets/no-image.png';
    }
    if (producto.Link_img ) return producto.Link_img;
    return `assets/heroes/${producto.id}.jpg`;
  }

}
