import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline', subscriptSizing: 'dynamic'
      }
    },
    provideEnvironmentNgxCurrency({
      align: "left",
      allowNegative: true,
      allowZero: true,
      decimal: ".",
      precision: 2,
      prefix: "$ ",
      suffix: "",
      thousands: ",",
      nullable: true,
      min: null,
      max: null,
      inputMode: NgxCurrencyInputMode.Financial,
    }),
  ],
}).catch((err) => console.error(err));
