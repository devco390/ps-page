import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { CallToActionsService } from 'src/app/services/call-to-actions.service';
import { IpService } from 'src/app/services/ip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ps-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  document: any;
  dataIp: any;
  phone = '3114386970';
  phoneShort = '311 438 69 70';
  phoneWhatsapp = '573114386970';

  readonly BASE_CLASS_TEXT = '.data-card';
  readonly BASE_CLASS_IMAGE = '.ps-image-card';
  readonly TRANSITION_TIME = 9000;

  images = [
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2Fprinter-ps.png?alt=media&token=eedb0fb7-aeb2-47b8-83dc-2f1225c837bf',
    // '/assets/images/ink.png',
  ];

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
    {
      title: 'Recargas',
      text: 'Recarga de Tóner y Cartuchos.',
    },
  ];

  public href: string = '';
  public isBogota: boolean = true;

  constructor(
    private callToActionsService: CallToActionsService,
    @Inject(DOCUMENT) _document: any,
    @Inject(PLATFORM_ID) private platformId: any,
    private ipService: IpService,
    private router: Router
  ) {
    this.document = _document;
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataIp = await this.ipService.getIp();
      this.initSlider(this.descriptions, this.BASE_CLASS_TEXT);
      this.href = this.router.url;
      this.isBogota =
        this.href.indexOf('bogota') !== -1 || this.href === '/' ? true : false;

      if (!this.isBogota) {
        this.phone = '3128741421';
        this.phoneShort = '312 874 14 21';
        this.phoneWhatsapp = '573128741421';
      }
    }
  }

  async initSlider(dataToAnimate: any[], className: string) {
    let indexUpdated = this.descriptions.length;
    var results = await Promise.all(
      [...dataToAnimate, undefined].map(
        async (item, index): Promise<any> => {
          const timeTransition = index * this.TRANSITION_TIME;
          indexUpdated = indexUpdated - 1;
          const isLast = item === undefined ? true : false;
          const data = await this.getAnimationSlider(
            className,
            timeTransition,
            index,
            isLast
          );
          return data;
        }
      )
    );
    if (results.length > 0) {
      this.initSlider(dataToAnimate, className);
    }
  }

  getAnimationSlider(
    className: string,
    time: number,
    index: number,
    isLast: boolean
  ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!isLast) {
          this.changeFadeIn(className, index);
        }
        resolve(index);
      }, time);
    });
  }

  changeFadeIn(className: string, toFadeIn: number) {
    let toFadeOut = 0;
    let cards = this.document.querySelectorAll(className);
    try {
      [...cards].map((card, index) => {
        card.classList.remove('animate__fadeInDown', 'animate__fadeOutDown');
        card.classList.add('hide');
        this.removeTimerCard(index);
      });

      if (toFadeIn === 0 || toFadeIn === cards.length) {
        toFadeIn = 0;
        toFadeOut = cards.length - 1;
      } else {
        toFadeOut = toFadeIn - 1;
        toFadeOut = toFadeOut < 0 ? cards.length - 1 : toFadeOut;
      }

      //card fadeOut
      const elToFadeOut = document.querySelector(`${className}--${toFadeOut}`);

      elToFadeOut.classList.remove('hide');
      elToFadeOut.classList.add('animate__fadeOutDown');

      //card fadeIn
      const elToFadeIn = document.querySelector(`${className}--${toFadeIn}`);

      this.initTimerCard(toFadeIn);

      elToFadeIn.classList.remove('hide');
      elToFadeIn.classList.add('animate__fadeInDown');
    } catch (e) {
      console.log(e);
    }
  }

  removeTimerCard(index) {
    const timer = document.querySelector(
      `.icon-timer__circle-animation--${index}`
    );
    if (timer) {
      timer.classList.remove('active');
    }
  }

  initTimerCard(index) {
    const timer = document.querySelector(
      `.icon-timer__circle-animation--${index}`
    );
    if (timer) {
      timer.classList.add('active');
    }
  }

  saveAnalyticsTrack(eventName: string): void {
    this.callToActionsService.saveAnalyticsTrack(eventName);
  }

  saveDataAction(eventName: string) {
    this.callToActionsService.saveDataAction(eventName, this.dataIp);
  }
}
