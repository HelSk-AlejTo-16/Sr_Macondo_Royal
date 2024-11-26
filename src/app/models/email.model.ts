export interface EmailData {
    adminEmail: string;
    customerEmail: string;
    order: any;
    items: OrderItem[];
    total: string;
    customerName: string;
    orderDate: string;
  }
  
  export interface OrderItem {
    name: string;
    quantity: number;
    unit_amount: {
      value: number;
      currency_code: string;
    };
  }