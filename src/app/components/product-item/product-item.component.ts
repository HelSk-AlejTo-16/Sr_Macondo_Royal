import { Component, Input, input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  
  @Input() product!: Product;

  constructor( 
    private messageService: MessageService
  ){ }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.messageService.sendMessage(this.product);
  }

}
