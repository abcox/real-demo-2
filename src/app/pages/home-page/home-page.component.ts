import { Component, computed, inject, OnInit } from '@angular/core';
import { PropertyListComponent } from "../../components/property-list/property-list.component";
import { PropertyService } from '../../services/property.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, PropertyListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  propertyService = inject(PropertyService);
  properties = this.propertyService.list;
  constructor() {
    //this.propertyService.setSelectedId(' ');
  }
  ngOnInit(): void {
    this.propertyService.setSelectedId(' ');
  }
}
