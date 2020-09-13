import { Component, OnInit } from '@angular/core';

import { GoogleAnalyticsService } from '../../services/google-analytics.service';
@Component({
  selector: 'ps-call-to-actions',
  templateUrl: './call-to-actions.component.html',
  styleUrls: ['./call-to-actions.component.scss']
})
export class CallToActionsComponent implements OnInit {
  phone = '+57-311-4386970';
  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  ngOnInit() {}

  sendTrack(eventName: string): void {
    this.googleAnalyticsService.eventEmitter(
      eventName,
      'call_to_actions',
      eventName,
      'click',
      0
    );
  }
}
