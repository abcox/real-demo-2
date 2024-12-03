import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type CmhcRateMap = {
  [key: number]: number;
};

type CmhcRateSchedule = {
  startRate: number;
  minPercentage: number;
  maxPercentage: number;
}

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './mortgage-calculator.component.html',
  styleUrl: './mortgage-calculator.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [CurrencyPipe]
})
export class MortgageCalculatorComponent /* implements OnChanges  */{
  price = input<number>();
  cmhcInsuranceRates = input<CmhcRateMap>({ 5: 0.038, 10: 0.0279, 15: 0.0238, 20: 0 });
  cmhcRateSchedule = input<CmhcRateSchedule>({ startRate: 0.038, minPercentage: 5, maxPercentage: 20 });
  fb = inject(FormBuilder);
  currencyPipe = inject(CurrencyPipe);
  form = this.fb.group({
    price: [this.price() || 0, [ Validators.required ]],
    downPaymentPercentage: [5, [ Validators.required ]],
    downPaymentAmount: [0, [ Validators.required ]],
    cmhcInsurance: [0],
    total: [100],
    period: [25, [ Validators.required ]],
    paymentFrequencyPeriod: [0, [ Validators.required ]],
    interest: [5, [ Validators.required ]],
  });

  constructor() {
    // Use Angular Signals' `effect` to respond to changes in the input signal
    effect(() => {
      const price = this.price();
      this.form.patchValue({ price: price });
    });
    this.setupFormValueChangesSubscriptions();
  }

  setupFormValueChangesSubscriptions(): void {
    const formControls = this.form.controls;
    const downPaymentAmount$ = formControls.downPaymentAmount.valueChanges;
    const downPaymentPercentage$ = formControls.downPaymentPercentage.valueChanges;
    const price$ = formControls.price.valueChanges;

    const downPaymentAmountCalc = (price: number, downPaymentPercentage: number) => {
      return price * downPaymentPercentage / 100;
    }
    const downPaymentPercentageCalc = (price: number, downPaymentAmount: number) => {
      return downPaymentAmount / price * 100;
    }
    const cmhcRates = this.cmhcInsuranceRates();
    //const cmhcRate = (cmhcRates: CmhcRateMap, downPaymentPercentage: number) => {
    //  // Ensure the percentage is a valid key in the rates object
    //  const closestKey = Object.keys(cmhcRates)
    //    .map(Number) // Convert keys to numbers
    //    .filter(key => downPaymentPercentage >= key) // Filter for keys less than or equal to percentage
    //    .sort((a, b) => b - a)[0]; // Get the closest lower or equal key    
    //  const rate = cmhcRates[closestKey] ?? 0; // Return the rate, or 0 if no valid key exists
    //  console.log('cmhcRate:', rate);
    //  return rate;
    //}
    const cmhcRateCalc = (cmhcRateSched: CmhcRateSchedule, downPaymentPercentage: number): number => {
      //const minPercentage = 5;
      //const maxPercentage = 20;
      //const startRate = 0.038; // 3.8%
      const { startRate, minPercentage, maxPercentage } = cmhcRateSched;
    
      if (downPaymentPercentage < minPercentage) {
        return startRate; // Full rate if less than minimum percentage
      }
    
      if (downPaymentPercentage >= maxPercentage) {
        return 0; // No insurance for 20% or more
      }
    
      // Linear interpolation for rates between 5% and 20%
      return startRate * (1 - (downPaymentPercentage - minPercentage) / (maxPercentage - minPercentage));
    }
    const cmhcInsuranceCalc = (cmhcRates: CmhcRateMap, price: number, downPaymentPercentage: number) => {
      //const rate = cmhcRate(cmhcRates, downPaymentPercentage);
      const rate = cmhcRateCalc(this.cmhcRateSchedule(), downPaymentPercentage);
      return price * rate;
    }
    const updateCmhcInsurance = (rates: CmhcRateMap, downPaymentPercentage: number, price: number): void => {
      //console.log('updateCmhcInsurance:', rates, price, downPaymentPercentage);
      const cmhcInsurance = cmhcInsuranceCalc(rates, downPaymentPercentage!, price!);
      //console.log('cmhcInsurance:', cmhcInsurance);
      this.form.patchValue({ cmhcInsurance }, { emitEvent: false });
    }

    downPaymentAmount$?.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(downPaymentAmount => {
        const { price } = this.form.value;
        const downPaymentPercentage = downPaymentPercentageCalc(price!, downPaymentAmount!);
        this.form.patchValue({ downPaymentPercentage }, { emitEvent: false });
      }),
      takeUntilDestroyed(),
    ).subscribe();

    downPaymentPercentage$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(downPaymentPercentage => {
        const { price } = this.form.value;
        const downPaymentAmount = downPaymentAmountCalc(price!, downPaymentPercentage!);
        this.form.patchValue({ downPaymentAmount }, { emitEvent: false });
        updateCmhcInsurance(cmhcRates, price!, downPaymentPercentage!);
      }),
      takeUntilDestroyed(),
    ).subscribe();

    price$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(price => {
        const { downPaymentPercentage } = this.form.value;
        const downPaymentAmount = downPaymentAmountCalc(price!, downPaymentPercentage!);
        this.form.patchValue({ downPaymentAmount }, { emitEvent: false });
        updateCmhcInsurance(cmhcRates, price!, downPaymentPercentage!);
      }),
      takeUntilDestroyed(),
    ).subscribe();
  }
}
