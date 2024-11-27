import { Component, Input } from '@angular/core';
import { PropertyListItemComponent } from './_components/property-list-item/property-list-item.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { PropertyModel } from '../../services/property.service';

export interface ViewModel {
  title: string;
  properties: PropertyModel[];
}

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyListItemComponent],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss'
})
export class PropertyListComponent {
  @Input() set list(values: PropertyModel[]) {
    this.properties$$.next(values);
  }
  properties$$ = new BehaviorSubject<PropertyModel[]>([]);
  vm$: Observable<ViewModel> = combineLatest([this.properties$$]).pipe(
    map(([properties]) => ({
      title: 'property-list works!',
      properties: properties
    } as ViewModel))
  );
}
