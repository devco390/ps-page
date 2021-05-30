import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  Input,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { CallToActionsService } from 'src/app/services/call-to-actions.service';
import { fromEvent } from 'rxjs';
import { sampleTime, map } from 'rxjs/operators';
import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'ps-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  ipSaved = false;
  document: any;
  dataIp: any;
  phone = '+57-311-4386970';
  phoneShort = '311 438 69 70';

  descriptions = [
    {
      title: 'Mantenimientos',
      text:
        'Mantenimientos Preventivos y Correctivos de impresoras en su casa u oficina.',
    },
    {
      title: 'Venta de Suministros',
      text: 'Venta de Cartuchos, Tóner y Tintas.',
    },
    { title: 'Recargas', text: 'Recarga de Tóner y Cartuchos.' },
  ];

  toFadeIn = this.descriptions.length;
  slideCount = this.descriptions.length;
  scrollSubscription: any;

  constructor(
    private callToActionsService: CallToActionsService,
    @Inject(DOCUMENT) _document: any,
    @Inject(PLATFORM_ID) private platformId: any,
    private ipService: IpService
  ) {
    this.document = _document;
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataIp = await this.ipService.getIp();
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
      this.scrollSubscription = scroll$.subscribe((tracker) => {
        if (
          Math.round(tracker.scrollTop) ===
          Math.round(tracker.scrollHeight - tracker.clientHeight)
        ) {
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
      this.toFadeIn = 1;
    }
    let cards = this.document.querySelectorAll(
      '.ps-main__item--description__text'
    );

    [...cards].map((card, index) => {
      card.classList.remove('animate__fadeInDown', 'animate__fadeOutDown');
      card.classList.add('hide');
      this.removeTimerCard(index + 1);
    });

    //card fadeOut
    const elToFadeOut = document.querySelector(
      `.ps-main__item--description__text--${toFadeOut}`
    );

    elToFadeOut.classList.remove('hide');
    elToFadeOut.classList.add('animate__fadeOutDown');

    //card fadeIn
    const elToFadeIn = document.querySelector(
      `.ps-main__item--description__text--${this.toFadeIn}`
    );

    this.initTimerCard(this.toFadeIn);

    elToFadeIn.classList.remove('hide');
    elToFadeIn.classList.add('animate__fadeInDown');

    setTimeout(() => {
      this.changeFadeIn();
    }, 9000);
  }

  removeTimerCard(index) {
    const timer = document.querySelector(
      `.icon-timer__circle-animation--${index}`
    );
    timer.classList.remove('active');
  }

  initTimerCard(index) {
    const timer = document.querySelector(
      `.icon-timer__circle-animation--${index}`
    );
    timer.classList.add('active');
  }

  saveAnalyticsTrack(eventName: string): void {
    this.callToActionsService.saveAnalyticsTrack(eventName);
  }

  saveDataAction(eventName: string) {
    this.callToActionsService.saveDataAction(eventName, this.dataIp);
  }
}
