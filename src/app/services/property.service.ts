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
      {
        id: '11',
        address: {
          street: '2425 Chestnut St',
          city: 'Atlanta',
          state: 'GA',
          postal: '30303',
        },
        askingPrice: 83000,
        cashflowMonthlyEstimate: 240,
        fairMarketRent: 950,
        paymentEstimate: 380,
        roomCounts: {
          beds: 2,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-11.jpg`,
      },
      {
        id: '12',
        address: {
          street: '2627 Poplar St',
          city: 'Miami',
          state: 'FL',
          postal: '33101',
        },
        askingPrice: 100000,
        cashflowMonthlyEstimate: 290,
        fairMarketRent: 1150,
        paymentEstimate: 440,
        roomCounts: {
          beds: 3,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-12.jpg`,
      },
      {
        id: '13',
        address: {
          street: '2829 Willow St',
          city: 'Houston',
          state: 'TX',
          postal: '77001',
        },
        askingPrice: 72000,
        cashflowMonthlyEstimate: 190,
        fairMarketRent: 870,
        paymentEstimate: 320,
        roomCounts: {
          beds: 1,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-13.jpg`,
      },
      {
        id: '14',
        address: {
          street: '3031 Fir St',
          city: 'Nashville',
          state: 'TN',
          postal: '37201',
        },
        askingPrice: 58000,
        cashflowMonthlyEstimate: 160,
        fairMarketRent: 780,
        paymentEstimate: 290,
        roomCounts: {
          beds: 2,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-14.jpg`,
      },
      {
        id: '15',
        address: {
          street: '3233 Beech St',
          city: 'Dallas',
          state: 'TX',
          postal: '75201',
        },
        askingPrice: 88000,
        cashflowMonthlyEstimate: 260,
        fairMarketRent: 1050,
        paymentEstimate: 400,
        roomCounts: {
          beds: 3,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-15.jpg`,
      },
      {
        id: '16',
        address: {
          street: '3435 Holly St',
          city: 'Los Angeles',
          state: 'CA',
          postal: '90001',
        },
        askingPrice: 92000,
        cashflowMonthlyEstimate: 280,
        fairMarketRent: 1100,
        paymentEstimate: 420,
        roomCounts: {
          beds: 2,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-16.jpg`,
      },
      {
        id: '17',
        address: {
          street: '3637 Cypress St',
          city: 'Philadelphia',
          state: 'PA',
          postal: '19103',
        },
        askingPrice: 64000,
        cashflowMonthlyEstimate: 170,
        fairMarketRent: 820,
        paymentEstimate: 300,
        roomCounts: {
          beds: 1,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-17.jpg`,
      },
      {
        id: '18',
        address: {
          street: '3839 Sycamore St',
          city: 'Charlotte',
          state: 'NC',
          postal: '28202',
        },
        askingPrice: 102000,
        cashflowMonthlyEstimate: 310,
        fairMarketRent: 1250,
        paymentEstimate: 470,
        roomCounts: {
          beds: 3,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-18.jpg`,
      },
      {
        id: '19',
        address: {
          street: '4041 Alder St',
          city: 'San Diego',
          state: 'CA',
          postal: '92101',
        },
        askingPrice: 86000,
        cashflowMonthlyEstimate: 240,
        fairMarketRent: 1020,
        paymentEstimate: 390,
        roomCounts: {
          beds: 2,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-19.jpg`,
      },
      {
        id: '20',
        address: {
          street: '4243 Dogwood St',
          city: 'Indianapolis',
          state: 'IN',
          postal: '46204',
        },
        askingPrice: 73000,
        cashflowMonthlyEstimate: 200,
        fairMarketRent: 880,
        paymentEstimate: 340,
        roomCounts: {
          beds: 1,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-20.jpg`,
      },
      {
        id: '21',
        address: {
          street: '4445 Redwood St',
          city: 'Baltimore',
          state: 'MD',
          postal: '21201',
        },
        askingPrice: 110000,
        cashflowMonthlyEstimate: 320,
        fairMarketRent: 1300,
        paymentEstimate: 490,
        roomCounts: {
          beds: 3,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-21.jpg`,
      },
      {
        id: '22',
        address: {
          street: '4647 Palm St',
          city: 'Salt Lake City',
          state: 'UT',
          postal: '84101',
        },
        askingPrice: 77000,
        cashflowMonthlyEstimate: 210,
        fairMarketRent: 920,
        paymentEstimate: 350,
        roomCounts: {
          beds: 2,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-22.jpg`,
      },
      {
        id: '23',
        address: {
          street: '4849 Cherry St',
          city: 'St. Louis',
          state: 'MO',
          postal: '63101',
        },
        askingPrice: 94000,
        cashflowMonthlyEstimate: 290,
        fairMarketRent: 1180,
        paymentEstimate: 430,
        roomCounts: {
          beds: 3,
          baths: 1.5,
        },
        imageUrl: `stock-photos/properties/property-23.jpg`,
      },
      {
        id: '24',
        address: {
          street: '5051 Magnolia St',
          city: 'Minneapolis',
          state: 'MN',
          postal: '55401',
        },
        askingPrice: 68000,
        cashflowMonthlyEstimate: 180,
        fairMarketRent: 860,
        paymentEstimate: 320,
        roomCounts: {
          beds: 1,
          baths: 1,
        },
        imageUrl: `stock-photos/properties/property-24.jpg`,
      },
    ];
  };  
  
  getById(id: string): Observable<PropertyModel[]> {
    console.log(`getById(${id}`);
    const seed = [...Array(24)].map((item, index) => this.mockPropertyData()[index]);
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