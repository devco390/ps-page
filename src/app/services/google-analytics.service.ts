import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var gtag;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    if (isPlatformBrowser(this.platformId)) {
      gtag('event', eventName, {
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: eventLabel,
        eventValue: eventValue
      });
    }
  }
}
