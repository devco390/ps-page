import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FirestoreService } from 'src/app/services/ip-tracker.service';
import { CallToActionsService } from 'src/app/services/call-to-actions.service';
import { fromEvent } from 'rxjs';
import { sampleTime, map } from 'rxjs/operators';

@Component({
  selector: 'ps-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  ipSaved = false;
  document: any;
  dataIp: any;
  animationClass = '';
  phone = '+57-311-4386970';

  descriptions = [
    { text: 'Mantenimientos Preventivos y Correctivos.' },
    { text: 'Domicilio sin costo en Bogotá.' },

    {
      text: 'Venta de Cartuchos, Toner y Tintas.'
    },
    {
      text: 'Rehabilitación Profesional en Piezas de Impresoras.'
    },
    // {
    //   text: 'Esto Soluciona los problema en un alto porcentaje de casos.'
    // },
    // { text: 'Contamos con técnicos altamente calificados.' },
    // { text: 'Gracias a ellos, garantizamos 100% nuestros servicios.' }
  ];

  toFadeIn = this.descriptions.length;
  slideCount = this.descriptions.length;
  scrollSubscription: any;

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService,
    private callToActionsService: CallToActionsService,
    @Inject(DOCUMENT) _document: any,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.document = _document;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getIp();
      setTimeout(() => {
        this.changeFadeIn();
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tracker = this.document.querySelector('.ps-main');
      const callToActions = this.document.querySelector(
        '.ps-main__call-to-actions'
      );
      const scroll$ = fromEvent(tracker, 'scroll').pipe(
        sampleTime(300),
        map(() => tracker)
      );
      this.scrollSubscription = scroll$.subscribe(tracker => {
        if (tracker.scrollTop === tracker.scrollHeight - tracker.clientHeight) {
          callToActions.classList.add('ps-main__call-to-actions--fixed-limit');
        } else {
          callToActions.classList.remove(
            'ps-main__call-to-actions--fixed-limit'
          );
        }
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollSubscription.unsubscribe();
    }
  }

  changeFadeIn() {
    const toFadeOut = this.toFadeIn;
    this.toFadeIn += 1;

    if (this.toFadeIn > this.slideCount) {
      this.animationClass = 'active';
      this.toFadeIn = 1;
    }
    let els = this.document.querySelectorAll(
      '.ps-main__item--description__text'
    );
    for (let i = 0; i < els.length; i += 1) {
      const el = els[i];

      el.classList.remove('ps-main__item--description__text--animation');
      el.classList.add('hide');
    }

    // const elToFadeOut = document.querySelector(
    //   `.ps-main__item--description__text--${toFadeOut}`
    // );
    // elToFadeOut.classList.remove('hide');
    // elToFadeOut.classList.add('ps-main__item--description__text--animation');

    const elToFadeIn = document.querySelector(
      `.ps-main__item--description__text--${this.toFadeIn}`
    );
    elToFadeIn.classList.remove('hide');
    elToFadeIn.classList.add('ps-main__item--description__text--animation');

    setTimeout(() => {
      this.changeFadeIn();
    }, 3000);
  }

  saveAnalyticsTrack(eventName: string): void {
    this.callToActionsService.saveAnalyticsTrack(eventName);
  }

  saveDataAction(eventName: string) {
    this.callToActionsService.saveDataAction(eventName, this.dataIp);
  }

  getIp() {
    this.ipSaved = sessionStorage['ip-saved-ps'] === undefined ? false : true;

    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
      this.saveIp(data.ip);
    });
  }

  saveIp(ip: string) {
    const fromf5 = this.ipSaved ? true : false;
    const currentDate = new Date();

    const date = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    this.dataIp = {
      ip: ip,
      date: date,
      dateJson: currentDate.toJSON(),
      fromF5: fromf5,
      routePath: this.document.location.pathname,
      timestamp: currentDate
    };
    sessionStorage['ip-saved-ps'] = this.dataIp;
    this.firestoreService
      .createIpTrack(this.dataIp)
      .then(res => {
        // console.log('firebase store SUCCESS');
      })
      .catch(res => {
        console.log('Store ERROR', res);
      });
  }
}
