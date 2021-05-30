import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from 'src/app/services/ip-tracker.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  readonly SESSION_STORAGE_IP = 'ip-saved-ps';
  document: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private firestoreService: FirestoreService,
    @Inject(DOCUMENT) _document: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.document = _document;
    }
  }

  async getIp() {
    if (!this.isIpSaved()) {
      const dataIpApi = await this.http
        .get<{ ip: string }>('https://jsonip.com')
        .toPromise();

      const dataIp = this.transformDataIp(dataIpApi.ip);
      this.saveIpInfirebase(dataIp);
      sessionStorage[this.SESSION_STORAGE_IP] = JSON.stringify(dataIp);

      return dataIp;
    } else {
      return this.getDataIp();
    }
  }

  getDataIp() {
    return JSON.parse(sessionStorage[this.SESSION_STORAGE_IP]);
  }

  isIpSaved(): boolean {
    return sessionStorage[this.SESSION_STORAGE_IP] !== undefined;
  }

  transformDataIp(ip: string) {
    const fromf5 = this.isIpSaved() ? true : false;
    const currentDate = new Date();

    const date = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    return {
      ip: ip,
      date: date,
      dateJson: currentDate.toJSON(),
      fromF5: fromf5,
      routePath: this.document.location.pathname,
      timestamp: currentDate,
    };
  }

  saveIpInfirebase(dataIp: any) {
    this.firestoreService
      .createIpTrack(dataIp)
      .then((res) => {
        // console.log('firebase store SUCCESS');
      })
      .catch((res) => {
        console.log('Store ERROR', res);
      });
  }
}
