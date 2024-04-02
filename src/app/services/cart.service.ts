import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);
    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 Item added to cart.', 'OK', { duration: 3000 });
    // console.log(this.cart.value);
  }

  removeQuantity(item: CartItem) {
    let itemForRemovel: CartItem | undefined;
    let filteredIthems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
      }
      if (_item.quantity === 0) {
        itemForRemovel = _item;
      }
      return _item;
    });
    if (itemForRemovel) {
      filteredIthems = this.removeFromCart(itemForRemovel, false);
    }
    this.cart.next({ items: filteredIthems });
    this._snackBar.open('1 item removed from cart', 'ok', {
      duration: 3000,
    });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((preve, current) => preve + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'OK', { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): CartItem[] {
    const filteredIthems = this.cart.value.items.filter((_item) => {
      _item.id !== item.id;
    });
    if (update) {
      this.cart.next({ items: filteredIthems });
      this._snackBar.open('1 Ithem removed from', 'OK', { duration: 3000 });
    }
    return filteredIthems;
  }
}
