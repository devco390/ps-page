import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardsComponent } from "./cards.component";

const routes: Routes = [{ path: "cards", component: CardsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule {}
