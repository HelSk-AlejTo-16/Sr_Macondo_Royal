import { Pipe, PipeTransform } from '@angular/core';

import { Sucursal } from '../interfaces/sucursal';

@Pipe({
  name: 'sucursalImage2'
})
export class SucursalImagePipe2 implements PipeTransform {

    transform(sucursal: Sucursal ): string {
      if(!sucursal.id && !sucursal.Img_Suc){
        return 'assets/no-image.png';
      }
      if (sucursal.Img_Suc ) return sucursal.Img_Suc;
      return `assets/heroes/${sucursal.id}.jpg`;
    }
  
  }