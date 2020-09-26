import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CallToActionsComponent } from './components/call-to-actions/call-to-actions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CardsModule } from './components/cards/cards.module';
import { BackgroundComponent } from './components/background/background.component';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { MapsComponent } from './components/maps/maps.component';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    CallToActionsComponent,
    NotFoundComponent,
    BackgroundComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CardsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4t3cwYydHGFXeL8k65XN44uuEqaxS98o'
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
