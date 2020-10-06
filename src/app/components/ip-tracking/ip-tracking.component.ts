import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/ip-tracker.service';
import { IpGeoLocaleService } from 'src/app/services/ip-geo-locale.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface IpData {
  ip: string;
  date: string[];
  fromF5: string;
  total: number;
  latitude?: number;
  longitude?: number;
  routePath?: string;
}

@Component({
  selector: 'app-ip-tracking',
  templateUrl: './ip-tracking.component.html',
  styleUrls: ['./ip-tracking.component.scss']
})
export class IpTrackingComponent implements OnInit {
  displayedColumns: string[] = ['ip', 'routePath', 'location', 'date', 'total'];
  dataSource: IpData[] = [];
  ipsData = null;
  ipsDataGeoLocale = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ipDaniel = '181.59.203.249';

  constructor(
    private firestoreService: FirestoreService,
    private ipGeoLocaleService: IpGeoLocaleService
  ) {}

  updateGeoLocaleIps() {
    this.ipsData.data.forEach(data => {
      const dataGeoLocaleIp = this.ipsDataGeoLocale.find(geoData => {
        return geoData.ip === data.ip;
      });

      if (!dataGeoLocaleIp) {
        this.ipGeoLocaleService.getDataIp(data.ip).subscribe(data => {
          console.log('=======================================');
          console.log(`Update data for ip:  ${data.ip} (In progress...)`);
          this.ipGeoLocaleService
            .createIpTrack(data)
            .then(res => {
              console.log(`Update data for ip:  ${data.ip} (Success)`);
              console.log(res);
              console.log('=======================================');
            })
            .catch(error => {
              console.log(`Update data for ip:  ${data.ip} (Failed)`);
              console.log(error);
              console.log('=======================================');
            });
        });
      } else {
        console.log('=======================================');
        console.log(`IP ${data.ip} Is already`);
        console.log('=======================================');
      }
    });
  }

  ngOnInit(): void {
    this.getGeoLocaleIps();
  }

  getDataIps() {
    this.firestoreService.getIpsTrack().subscribe(ipsSnapshot => {
      this.dataSource = [];

      ipsSnapshot.forEach((ipData: any) => {
        const location = this.ipsDataGeoLocale.find(dataLocation => {
          return dataLocation.ip === ipData.payload.doc.data().ip;
        });

        this.dataSource.push({
          ip: ipData.payload.doc.data().ip,
          date: ipData.payload.doc.data().date,
          fromF5: ipData.payload.doc.data().fromF5,
          total: 0,
          latitude: location === undefined ? '' : location.latitude,
          longitude: location === undefined ? '' : location.longitude,
          routePath:
            ipData.payload.doc.data().routePath === undefined
              ? '/'
              : ipData.payload.doc.data().routePath.toString()
        });
      });

      this.ipsData = new MatTableDataSource<IpData>(this.transformDataIps());
      this.ipsData.sort = this.sort;
    });
  }

  getGeoLocaleIps() {
    this.ipGeoLocaleService.getIpsTrack().subscribe(ipsSnapshot => {
      this.dataSource = [];

      ipsSnapshot.forEach((ipData: any) => {
        this.ipsDataGeoLocale.push(ipData.payload.doc.data());
      });
      this.getDataIps();
    });
  }

  transformFromReload(fromReload: string): string {
    return fromReload ? '(Recargó la página)' : '';
  }

  transformDataIps() {
    let result = this.dataSource.reduce((prev, current, index, arr) => {
      let exists = prev.find(x => x.ip === current.ip);
      if (!exists) {
        const dataSourceByIp = this.dataSource.filter(data => {
          return data.ip === current.ip;
        });

        const dates = dataSourceByIp.map(data => {
          return `${data.date} ${this.transformFromReload(data.fromF5)}`;
        });

        exists = {
          ip: current.ip,
          date: dates,
          fromF5: current.fromF5,
          total: this.getTotalIp(current.ip),
          latitude: current.latitude,
          longitude: current.longitude,
          routePath: current.routePath
        };
        prev.push(exists);
      }

      return prev;
    }, []);

    return result.sort(function(a, b) {
      if (a.total < b.total) {
        return 1;
      }
      if (a.total > b.total) {
        return -1;
      }
      return 0;
    });
  }

  getTotalIp(ip: string): number {
    const data = this.dataSource.filter(obj => {
      return obj.ip === ip;
    });
    return data === undefined ? 0 : data.length;
  }
}
