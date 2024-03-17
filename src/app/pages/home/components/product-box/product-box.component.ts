import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-box',
  standalone: true,

  imports: [MaterialModule, CommonModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css',
})
export class ProductBoxComponent {
  @Input() fullwidthMode = false;
  px: any;
}
