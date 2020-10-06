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
      const currentDate = new Date();
      const date = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

      this.saveIp(data.ip, date);
    });
  }

  saveIp(ip: string, date: string) {
    const fromf5 = this.ipSaved ? true : false;

    this.dataIp = {
      ip: ip,
      date: date,
      fromF5: fromf5,
      routePath: this.document.location.pathname
    };
    sessionStorage['ip-saved-ps'] = this.dataIp;
    this.firestoreService.createIpTrack(this.dataIp);
  }
}
