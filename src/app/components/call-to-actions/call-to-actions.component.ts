import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { CallToActionsService } from '../../services/call-to-actions.service';
@Component({
  selector: 'ps-call-to-actions',
  templateUrl: './call-to-actions.component.html',
  styleUrls: ['./call-to-actions.component.scss'],
})
export class CallToActionsComponent implements OnInit, OnChanges {
  phone = '3114386970';
  phoneWhatsapp = '+57-311-4386970';
  @Input() dataIp: any;

  constructor(private callToActionsService: CallToActionsService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.dataIp && changes.dataIp.currentValue) {
      this.dataIp = changes.dataIp.currentValue;
    }
  }

  ngOnInit() {}

  saveAnalyticsTrack(eventName: string): void {
    this.callToActionsService.saveAnalyticsTrack(eventName);
  }

  saveDataAction(eventName: string) {
    this.callToActionsService.saveDataAction(eventName, this.dataIp);
  }
}
