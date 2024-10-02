import { Pipe, PipeTransform } from '@angular/core';

import { Sucursal } from '../interfaces/sucursal';

@Pipe({
  name: 'sucursalImage'
})
export class SucursalImagePipe implements PipeTransform {

  transform(sucursal: Sucursal ): string {
    if(!sucursal.id && !sucursal.Img_Suc){
      return 'assets/no-image.png';
    }
    if (sucursal.Img_Suc ) return sucursal.Img_Suc;
    return `assets/heroes/${sucursal.id}.jpg`;
  }

}

