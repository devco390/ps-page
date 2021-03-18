import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window.component';
import { RouterModule } from '@angular/router';

import { WindowRoutingModule } from './window-routing.module';

@NgModule({
  declarations: [WindowComponent],
  imports: [CommonModule, WindowRoutingModule],
  exports: [WindowComponent],
})
export class WindowModule {}
