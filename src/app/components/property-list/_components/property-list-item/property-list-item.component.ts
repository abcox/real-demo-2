import { Component, Input, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PropertyModel } from '../../../../services/property.service';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../../../shared/address/address.component';
import { AttributeChipListComponent } from "../../../shared/attribute-chip-list/attribute-chip-list.component";

/* export interface PropertyModel {
  name: string;
}
 */
@Component({
  selector: 'app-property-list-item',
  standalone: true,
  imports: [AddressComponent, CommonModule, MatCardModule, AttributeChipListComponent],
  templateUrl: './property-list-item.component.html',
  styleUrl: './property-list-item.component.scss'
})
export class PropertyListItemComponent {
  @Input() property!: PropertyModel;
}
