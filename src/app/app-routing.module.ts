import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IpTrackingComponent } from './components/ip-tracking/ip-tracking.component';
import { ActionsTrackingComponent } from './components/actions-tracking/actions-tracking.component';

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: () =>
      import('./components/cards/cards.module').then((mod) => mod.CardsModule),
  },
  {
    path: 'window',
    loadChildren: () =>
      import('./components/window/window.module').then(
        (mod) => mod.WindowModule
      ),
  },
  { path: '', component: MainComponent, pathMatch: 'full' },
  {
    path: 'mantenimiento-impresoras-bogota',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'mantenimiento-impresoras-medellin',
    component: MainComponent,
    pathMatch: 'full',
  },
  { path: 'ips', component: IpTrackingComponent, pathMatch: 'full' },
  { path: 'actions', component: ActionsTrackingComponent, pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
