import {
  Component,
  OnInit,
  Input,
  Inject,
  SimpleChanges,
  OnChanges,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CallToActionsService } from '../../services/call-to-actions.service';

@Component({
  selector: 'ps-call-to-actions',
  templateUrl: './call-to-actions.component.html',
  styleUrls: ['./call-to-actions.component.scss'],
})
export class CallToActionsComponent implements OnInit, OnChanges {
  phone = '3114386970';
  phoneShort = '311 438 69 70';
  phoneWhatsapp = '573114386970';
  @Input() dataIp: any;
  public href: string = '';
  public isBogota: boolean = true;

  constructor(
    private callToActionsService: CallToActionsService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.dataIp && changes.dataIp.currentValue) {
      this.dataIp = changes.dataIp.currentValue;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.href = this.router.url;
      this.isBogota =
        window.location.href.indexOf('bogota') !== -1 ||
        window.location.href === '/'
          ? true
          : false;

      if (!this.isBogota) {
        this.phone = '3104076873';
        this.phoneShort = '310 407 68 73';
        this.phoneWhatsapp = '573104076873';
      }
    }
  }

  saveAnalyticsTrack(eventName: string): void {
    this.callToActionsService.saveAnalyticsTrack(eventName);
  }

  saveDataAction(eventName: string) {
    this.callToActionsService.saveDataAction(eventName, this.dataIp);
  }
}
