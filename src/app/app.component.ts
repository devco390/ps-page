import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
    const navEndEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-177560620-1', {
        page_path: event.urlAfterRedirects
      });
    });
  }

  ngOnInit() {
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
