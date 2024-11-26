import { Product } from "./product";

export class CartItemModel {
    productId: number;
    productName: string;
    price: number;
    productPrice:number;
    quantity: number;

    constructor(product: Product){
        this.productId = product.id;
        this.productName = product.name;
        this.price = product.price;
        this.productPrice = product.price;
        this.quantity = 1; 
    }
}
