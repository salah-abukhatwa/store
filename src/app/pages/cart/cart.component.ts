import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private http: HttpClient) {}
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 4,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeQuantity(item);
  }

  onCheckOut(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51P55q5Jj6bjZair1NhD66dyC2T9dfe6FBuwSoB5Xr6rsc3egxShwDfkpiYM4aB7Y0frE6ZuX0tNzuqcggBUh6quF003oF1r0ok'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
