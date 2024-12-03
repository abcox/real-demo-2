import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AddressComponent } from '../shared/address/address.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { AttributeChipListComponent } from '../shared/attribute-chip-list/attribute-chip-list.component';
import { MortgageCalculatorComponent } from '../finance/mortgage-calculator/mortgage-calculator.component';
import { PropertyModel, PropertyService } from '../../services/property.service';
import { MatButtonModule } from '@angular/material/button';

interface PropertyState {
  property: any; // Replace `any` with the actual type of your property data
}

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, AddressComponent, AttributeChipListComponent, MatButtonModule, MatExpansionModule,
    MortgageCalculatorComponent, RouterModule
  ],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {
  propertyService = inject(PropertyService);
  property = this.propertyService.selected;

  constructor(private router: Router, private route: ActivatedRoute) {
    // Access the property data passed through the router's state
    //console.log('router:', this.router);
    const navigation = this.router.getCurrentNavigation();
    //console.log('Navigation:', navigation);
    const property = (navigation?.extras.state as PropertyState)?.property;
    if (property) {
      this.propertyService.setSelectedProperty(property);
      console.warn('Property set from state', property);
    }
  }

  ngOnInit(): void {
    if (!this.property()) {
      // Fallback: if no state is passed via html routerLink prop, and
      // the property is not available in the service
      // fetch the property based on the ID
      const propertyId = this.route.snapshot.paramMap.get('id');
      console.warn('Property retrieved from service by id', propertyId);
      //this.property = this.propertyService.getProperty(propertyId);
      if (!propertyId) {
        console.error('Property id not found in route');
        return;
      }
      this.propertyService.setSelectedPropertyById(propertyId);
    }
  }
}
