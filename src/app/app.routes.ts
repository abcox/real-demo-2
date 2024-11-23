import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback for unknown routes
];
