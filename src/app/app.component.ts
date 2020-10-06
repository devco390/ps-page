import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from './services/ip-tracker.service';
import { DOCUMENT } from '@angular/common';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ipSaved = false;
  document: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private firestoreService: FirestoreService,
    @Inject(DOCUMENT) _document: any
  ) {
    this.document = _document;
    const navEndEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-177560620-1', {
        page_path: event.urlAfterRedirects
      });
    });
  }

  getIp() {
    this.ipSaved = sessionStorage['ip-saved-ps'] === undefined ? false : true;

    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
      const currentDate = new Date();
      const date = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

      this.saveIp(data.ip, date);
    });
  }

  saveIp(ip: string, date: string) {
    const fromf5 = this.ipSaved ? true : false;
    sessionStorage['ip-saved-ps'] = 1;

    let data = {
      ip: ip,
      date: date,
      fromF5: fromf5,
      routePath: this.document.location.pathname
    };
    this.firestoreService.createIpTrack(data);
  }

  ngOnInit() {
    this.getIp();

    console.log(
      `======================================
Hay cosas peores que estar solo      
pero a menudo toma décadas darse cuenta de ello      
y más a menudo cuando esto ocurre      
es demasiado tarde      
y no hay nada peor      
que un "demasiado tarde".

(¡OH, SI! - Charles Bukowski)

https://www.youtube.com/watch?v=rAR7GORSL3M

======================================`
    );
  }

  clearServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(function(registrations) {
          for (let registration of registrations) {
            registration.unregister();
          }
        })
        .catch(function(err) {
          console.log('Service Worker registration failed: ', err);
        });
    }
  }
}
