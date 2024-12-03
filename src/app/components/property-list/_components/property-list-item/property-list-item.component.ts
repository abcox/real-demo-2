import { Component, inject, Input, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PropertyModel, PropertyService } from '../../../../services/property.service';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../../../shared/address/address.component';
import { AttributeChipListComponent } from "../../../shared/attribute-chip-list/attribute-chip-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-list-item',
  standalone: true,
  imports: [
    AddressComponent, CommonModule, MatCardModule, MatButtonModule,
    MatIconModule, AttributeChipListComponent,
    RouterModule
  ],
  templateUrl: './property-list-item.component.html',
  styleUrl: './property-list-item.component.scss'
})
export class PropertyListItemComponent {
  @Input() property!: PropertyModel;
  propertyService = inject(PropertyService);
  router = inject(Router);
  favorite = false;
  toggleFavorite() {
    this.favorite = !this.favorite;
  }
  navigateToDetail(property: PropertyModel) {
    this.propertyService.setSelectedProperty(property);
    this.router.navigate(['property', property.id]);
  }
}
