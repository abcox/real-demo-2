import { Component, Input, OnInit, computed } from '@angular/core';
import { AddressModel } from '../../../services/property.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  @Input() address?: AddressModel;
  available = false;
  ngOnInit() {
    this.available = this.address !== undefined &&
    this.address?.street !== undefined &&
    this.address?.city !== undefined &&
    this.address?.state !== undefined &&
    this.address?.postal !== undefined;
  }
}
