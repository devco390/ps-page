import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WindowComponent } from './window.component';

const routes: Routes = [{ path: 'window', component: WindowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WindowRoutingModule {}
