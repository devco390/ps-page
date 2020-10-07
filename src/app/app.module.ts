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
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IpTrackingComponent } from './components/ip-tracking/ip-tracking.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActionsTrackingComponent } from './components/actions-tracking/actions-tracking.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    IpTrackingComponent,
    ActionsTrackingComponent,
    SidebarComponent,
    CallToActionsComponent,
    NotFoundComponent,
    BackgroundComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    CardsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4t3cwYydHGFXeL8k65XN44uuEqaxS98o'
    }),
    AgmJsMarkerClustererModule,
    NoopAnimationsModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
