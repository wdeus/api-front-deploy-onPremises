import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { KeyIndicatorsComponent } from './key-indicators/key-indicators.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'key-indicators', component: KeyIndicatorsComponent },
];
