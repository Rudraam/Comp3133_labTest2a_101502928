import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'launches',
    loadComponent: () =>
      import('./components/launch-list/launch-list.component').then(m => m.LaunchListComponent)
  },
  {
    path: 'launches/:id',
    loadComponent: () =>
      import('./components/launch-detail/launch-detail.component').then(m => m.LaunchDetailComponent)
  },
  {
    path: '',
    redirectTo: '/launches',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/launches'
  }
];
