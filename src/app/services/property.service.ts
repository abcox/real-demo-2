import { KeyValue } from '@angular/common';
import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  // init state
  private state = signal<StateModel>({
    loading: false,
    selected: undefined,
    list: [],
    error: null
  });

  // selectors
  loading = computed(() => this.state().loading);
  selected = computed(() => this.state().selected);
  list = computed(() => this.state().list);
  error = computed(() => this.state().error);

  private selectedIdSubject = new Subject<string>();
  private selectedId$ = this.selectedIdSubject.asObservable();

  constructor() {
    this.selectedId$.pipe(
      tap(id => console.log(`selectedId$ id: ${id}`)),
      tap(() => this.setLoading(true)),
      //tap(id => this.setSelectedId(id)),
      switchMap(id => this.getById(id)),
      //delay(1000),
      //takeUntilDestroyed(),
      //map()
      tap(results => console.log(`results:`, results))
    ).subscribe(results => this.setList(results));
  }

  setSelectedId(id: string) {
    this.selectedIdSubject.next(id);
  }

  setList(values: PropertyModel[]) {
    this.state.update(state => ({
      ...state,
      list: values,
      loading: false
    }))
  }

  setLoading(value: boolean) {
    this.state.update(state => ({
      ...state,
      loading: value
    }));
  }

  imgIds = () => {
    return [142, 1040, 142];
  }

  rndImgId = () => {
    const rnd = getRandomInRange(0, 2);
    console.log(`rnd`, rnd);
    console.log(`imgIds`, this.imgIds());
    return this.imgIds()[rnd];
  }

  rndImg = () => {
    const imgs = [
      'https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const rndIdx = getRandomInRange(0, 1);
    return imgs[rndIdx];
  }

  mockPropertyData = () => {
    return [
      {
        id: '1',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          postal: '62701',
        },
        askingPrice: 50000,
        cashflowMonthlyEstimate: 200,
        fairMarketRent: 800,
        paymentEstimate: 300,
        roomCounts: {
          beds: 2,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-1.jpg`,
      },
      {
        id: '2',
        address: {
          street: '456 Elm St',
          city: 'Columbus',
          state: 'OH',
          postal: '43215',
        },
        askingPrice: 85000,
        cashflowMonthlyEstimate: 250,
        fairMarketRent: 1000,
        paymentEstimate: 400,
        roomCounts: {
          beds: 3,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-2.jpg`,
      },
      {
        id: '3',
        address: {
          street: '789 Oak St',
          city: 'Austin',
          state: 'TX',
          postal: '73301',
        },
        askingPrice: 120000,
        cashflowMonthlyEstimate: 300,
        fairMarketRent: 1200,
        paymentEstimate: 450,
        roomCounts: {
          beds: 2,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-3.jpg`,
      },
      {
        id: '4',
        address: {
          street: '1011 Pine St',
          city: 'Denver',
          state: 'CO',
          postal: '80202',
        },
        askingPrice: 75000,
        cashflowMonthlyEstimate: 220,
        fairMarketRent: 900,
        paymentEstimate: 350,
        roomCounts: {
          beds: 1,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-4.jpg`,
      },
      {
        id: '5',
        address: {
          street: '1213 Cedar St',
          city: 'Seattle',
          state: 'WA',
          postal: '98101',
        },
        askingPrice: 95000,
        cashflowMonthlyEstimate: 270,
        fairMarketRent: 1100,
        paymentEstimate: 420,
        roomCounts: {
          beds: 3,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-5.jpg`,
      },
      {
        id: '6',
        address: {
          street: '1415 Maple St',
          city: 'Boston',
          state: 'MA',
          postal: '02108',
        },
        askingPrice: 68000,
        cashflowMonthlyEstimate: 180,
        fairMarketRent: 850,
        paymentEstimate: 310,
        roomCounts: {
          beds: 1,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-6.jpg`,
      },
      {
        id: '7',
        address: {
          street: '1617 Birch St',
          city: 'Phoenix',
          state: 'AZ',
          postal: '85001',
        },
        askingPrice: 54000,
        cashflowMonthlyEstimate: 150,
        fairMarketRent: 750,
        paymentEstimate: 280,
        roomCounts: {
          beds: 2,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-7.jpg`,
      },
      {
        id: '8',
        address: {
          street: '1819 Spruce St',
          city: 'Portland',
          state: 'OR',
          postal: '97204',
        },
        askingPrice: 115000,
        cashflowMonthlyEstimate: 320,
        fairMarketRent: 1250,
        paymentEstimate: 480,
        roomCounts: {
          beds: 3,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-8.jpg`,
      },
      {
        id: '9',
        address: {
          street: '2021 Walnut St',
          city: 'Chicago',
          state: 'IL',
          postal: '60601',
        },
        askingPrice: 105000,
        cashflowMonthlyEstimate: 310,
        fairMarketRent: 1200,
        paymentEstimate: 460,
        roomCounts: {
          beds: 2,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-9.jpg`,
      },
      {
        id: '10',
        address: {
          street: '2223 Ash St',
          city: 'San Francisco',
          state: 'CA',
          postal: '94103',
        },
        askingPrice: 72000,
        cashflowMonthlyEstimate: 200,
        fairMarketRent: 870,
        paymentEstimate: 330,
        roomCounts: {
          beds: 1,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-10.jpg`,
      },
    ];
  };
  
  getById(id: string): Observable<PropertyModel[]> {
    console.log(`getById(${id}`);
    const seed = [...Array(6)].map((item, index) => this.mockPropertyData()[index]);
    const filtered = seed.filter(x => x.id === id)
    console.log(`getById(${id}) seed:`, seed);
    return of(seed);
  }
}

const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export interface AddressModel {
  street?: string;
  city?: string;
  state?: string;
  postal?: string;
}

export interface PropertyModel {
  id: string;
  imageUrl: string;
  address?: AddressModel;
  askingPrice: number;
  cashflowMonthlyEstimate: number;
  fairMarketRent: number;
  paymentEstimate: number;
  roomCounts: RoomCountModel;
}

//export type RoomType = 'bed' | 'bath';
//export type RoomCountModel = KeyValue<RoomType, number>;
export type RoomCountModel = { beds: number; baths: number };

interface StateModel {
  loading: boolean;
  selected: PropertyModel | undefined;
  list: PropertyModel[];
  error: string | null;
}