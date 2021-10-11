import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'ps-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  color = '';
  @Input() dataIp: any;

  constructor(
    private ipService: IpService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataIp = await this.ipService.getIp();
    }
  }

  changeColor(color: string) {
    this.color = color;
  }

  redirectHome() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = '/';
    }
  }
}
