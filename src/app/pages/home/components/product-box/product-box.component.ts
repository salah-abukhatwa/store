import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  standalone: true,

  imports: [MaterialModule, CommonModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css',
})
export class ProductBoxComponent {
  @Input() fullwidthMode = false;
  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
