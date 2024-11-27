import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RoomCountModel } from '../../../services/property.service';
import { BehaviorSubject } from 'rxjs';

export const keyValuePairToObject = (data: [string, number][]): Record<string, number> => {
  const result: Record<string, number> = {};
  for (const [key, value] of data) {
    result[key] = value;
  }
  return result;
}

export const objectToKeyValuePair2 = (data: Record<string, number>): [string, number][] => {
  const result: [string, number][] = [];
  for (const key in data) {
    result.push([key, data[key]]);
  }
  return result;
}

/* function objectToKeyValuePairs<T>(obj: T): { key: keyof T; value: T[keyof T] }[] {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
} */

@Component({
  selector: 'app-attribute-chip-list',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './attribute-chip-list.component.html',
  styleUrl: './attribute-chip-list.component.scss'
})
export class AttributeChipListComponent {
  //@Input() attributes: RoomCountModel | undefined;
  @Input() set attributes(value: RoomCountModel | undefined) {
    console.log('value:', value);
    if (value) {
      this._attributes = Object.entries(value);
    } else {
      this._attributes = [];
    }
  }
  _attributes: [string, number][] = [];
  get attributes(): [string, number][] {
    return this._attributes;
  }
  /* @Input() set attributes(value: RoomCountModel) {
    if (value) {
      //const data = Object.entries(value);
      const data = objectToKeyValuePair(value);
      this.attributes$$.next(value);
    }
  } */
  attributes$$ = new BehaviorSubject<any | undefined>(undefined);
  toggleSelection(attribute: [string, number]) {
    console.log('attribute:', attribute);
  }
  attributes$ = this.attributes$$.asObservable();
}
