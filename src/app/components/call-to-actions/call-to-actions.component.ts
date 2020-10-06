import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';

import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { CallToActionsService } from '../../services/call-to-actions.service';
@Component({
  selector: 'ps-call-to-actions',
  templateUrl: './call-to-actions.component.html',
  styleUrls: ['./call-to-actions.component.scss']
})
export class CallToActionsComponent implements OnInit, OnChanges {
  phone = '+57-311-4386970';
  @Input() dataIp: any;

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private callToActionsService: CallToActionsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.dataIp && changes.dataIp.currentValue) {
      this.dataIp = changes.dataIp.currentValue;
    }
  }

  ngOnInit() {}

  sendTrack(eventName: string): void {
    this.googleAnalyticsService.eventEmitter(
      eventName,
      'actions',
      'click',
      eventName
    );
  }

  saveDataAction(eventName: string) {
    const currentDate = new Date();
    const date = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const data = {
      ...this.dataIp,
      date: date,
      eventName: eventName
    };
    this.callToActionsService.createData(data);
  }
}
