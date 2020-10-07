import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { FirestoreService } from 'src/app/services/ip-tracker.service';

@Component({
  selector: 'ps-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  ipSaved = false;
  document: any;
  dataIp: any;

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService,
    @Inject(DOCUMENT) _document: any
  ) {
    this.document = _document;
  }

  ngOnInit() {
    this.getIp();
  }

  getIp() {
    this.ipSaved = sessionStorage['ip-saved-ps'] === undefined ? false : true;

    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
      this.saveIp(data.ip);
    });
  }

  saveIp(ip: string) {
    const fromf5 = this.ipSaved ? true : false;
    const currentDate = new Date();

    const date = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    this.dataIp = {
      ip: ip,
      date: date,
      dateJson: currentDate.toJSON(),
      fromF5: fromf5,
      routePath: this.document.location.pathname,
      timestamp: currentDate
    };
    sessionStorage['ip-saved-ps'] = this.dataIp;
    this.firestoreService
      .createIpTrack(this.dataIp)
      .then(res => {
        // console.log('firebase store SUCCESS');
      })
      .catch(res => {
        console.log('Store ERROR', res);
      });
  }
}
