import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title:
      'Asociación de Suscriptores del Acueducto de las Veredas Garibay, Manga y Gachanzuca del Municipio de Togüí - Boyacá',
    loadComponent: () => import('@app/modules/develop/launcher/launcher').then((m) => m.Launcher),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
