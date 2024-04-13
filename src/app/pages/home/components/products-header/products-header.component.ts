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
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sortByMenu: any;
  sort = 'desc';
  itemsShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;

    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumsUpdated(colsNum: number): void {
    this.columsCountChange.emit(colsNum);
  }
}
