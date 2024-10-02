import { Pipe, PipeTransform } from '@angular/core';

import { JuegoService } from '../services/juego.service';
import { Juego } from '../interfaces/juego';

@Pipe({
  name: 'JuegoImage'
})
export class JuegoImagePipe implements PipeTransform {

  transform(juego: Juego ): string {
    if(!juego.id && !juego.Img_Jueg){
      return 'assets/no-image.png';
    }
    if (juego.Img_Jueg) return juego.Img_Jueg;
    return `assets/heroes/${juego.Img_Jueg}.jpg`;
  }

}
