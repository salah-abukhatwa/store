import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css',
})
export class ProductsHeaderComponent {
  @Output() columsCountChange = new EventEmitter<number>();
  sortByMenu: any;
  sort = 'desc';
  itemsShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumsUpdated(colsNum: number): void {
    this.columsCountChange.emit(colsNum);
  }
}
