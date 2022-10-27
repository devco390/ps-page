import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { IpService } from './services/ip.service';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ipSaved = false;
  dataIp: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private ipService: IpService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const navEndEvents$ = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      );

      navEndEvents$.subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-177560620-1', {
          page_path: event.urlAfterRedirects,
        });
      });
    }
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataIp = await this.ipService.getIp();
    }

    console.log(
      `======================================
Style is the answer to everything...
https://www.youtube.com/watch?v=nGnGj3zL-bU


"Yo no digo nunca lo que creo, 
ni creo nunca lo que digo, 
y si se me escapa alguna verdad de vez en cuando, 
la escondo entre tantas mentiras, que es difícil reconocerla."

"For a long time I have not said what I believed, 
nor do I ever believe what I say, 
and if indeed sometimes I do happen to tell the truth, 
I hide it among so many lies that it is hard to find."

Nicolás Maquiavelo
======================================`
    );
  }

  clearServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(function (registrations) {
          for (let registration of registrations) {
            registration.unregister();
          }
        })
        .catch(function (err) {
          console.log('Service Worker registration failed: ', err);
        });
    }
  }
}
