import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ps-page';

  ngOnInit() {
    console.log(
      `======================================
Disfruta del pánico que te provoca
tener la vida por delante.
.
.
.
Las experiencias de quienes nos precedieron,
de nuestros “poetas muertos”,
te ayudan a caminar por la vida
La sociedad de hoy somos nosotros:
Los “poetas vivos”.
.
.
.
No permitas que la vida te pase a ti sin que la vivas. 

(Walt Whitman)

ttps://www.youtube.com/watch?v=84hVojXBLY0

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
