import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: () =>
      import('./components/cards/cards.module').then(mod => mod.CardsModule)
  },
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'mantenimiento-impresoras-bogota', component: MainComponent, pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
