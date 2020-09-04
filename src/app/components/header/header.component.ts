import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ps-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color = '';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {}

  changeColor(color: string) {
    this.color = color;
  }

  redirectHome() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = '/';
    }
  }
}
