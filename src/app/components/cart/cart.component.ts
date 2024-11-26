import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Product } from '../../models/product';
import { CartItemModel } from '../../models/cart-item-model';
import { StorageService } from '../../services/storage.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from '../../../environment/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItemModel[] = [];
  total = 0;
  public payPalConfig?: IPayPalConfig;
  cartItem: any;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.initConfig();
    if (this.storageService.existsCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.getTotal().toString()
              }
            }
          },
          items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data));

        // Primero mostramos el modal y vaciamos el carrito
        this.openModal(
          data.purchase_units[0].items,
          data.purchase_units[0].amount.value
        );
        this.emptyCart();

        // Luego enviamos el correo en segundo plano
        this.emailService.sendPurchaseConfirmation(data).subscribe({
          next: (response) => {
            console.log('Correo enviado exitosamente', response);
          },
          error: (error) => {
            console.error('Error al enviar el correo', error);
          }
        });

        // Ocultamos el spinner después de mostrar el modal
        this.spinner.hide();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.spinner.hide();
      },
      onError: err => {
        console.log('OnError', err);
        this.spinner.hide();
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  getItem(): void {
    this.messageService.getMessage().subscribe((product: Product) => {
      let exist = false;
      this.cartItems.forEach(item => {
        if (item.productId === product.id) {
          exist = true;
          item.quantity++;
        }
      });
      if (!exist) {
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);
      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    });
  }

  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel) => {
      item = {
        name: it.productName,
        quantity: it.quantity,
        unit_amount: { value: it.productPrice, currency_code: 'MXN' }
      };
      items.push(item);
    });
    return items;
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(i: number): void {
    if (this.cartItems[i].quantity > 1) {
      this.cartItems[i].quantity--;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }

  openModal(items: any, amount: any): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }
}