import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  catigores: [string] | undefined;
  catigoriesSub: Subscription | undefined;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.catigoriesSub = this.storeService
      .getAllCategories()
      .subscribe((res) => {
        this.catigores = res;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.catigoriesSub) {
      this.catigoriesSub?.unsubscribe();
    }
  }
}
