import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback for unknown routes
];
