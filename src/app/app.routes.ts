import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsolidadoComponent } from './component/consolidado/consolidado.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Página principal',
  },
  {
    path: 'consolidado',
    component: ConsolidadoComponent,
    title: 'Soy consolidado',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
