import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  catigores = ['shoes', 'sports'];

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
