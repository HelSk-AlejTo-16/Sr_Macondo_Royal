import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
  new Product(1,'Pizza','deliciosa', 50,'https://assets.teenvogue.com/photos/5ab665d06d36ed4396878433/master/pass/GettyImages-519526540.jpg'),
  new Product(2,'Hamburguesa','deliciosa', 45,'https://smartremo.es/wp-content/uploads/2020/04/hamburguesa-scaled.jpg'),
  new Product(3,'Empanada','deliciosa', 35,'https://i.pinimg.com/736x/a9/9b/8c/a99b8c61829fbfac36fa110193009f59.jpg'),
  new Product(4,'Pastel','delicioso', 40,'https://i.pinimg.com/originals/61/c7/9e/61c79e4f8ef042e5d128fdc52b814d67.jpg'),
];
  constructor() { }

  getProducts(): Product[]{
    return this.products;
  }

}
