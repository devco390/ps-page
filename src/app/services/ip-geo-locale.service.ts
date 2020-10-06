import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IpGeoLocaleService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  public createIpTrack(data: any) {
    return this.firestore.collection('geoLocaleIps').add(data);
  }

  public getIpTrack(documentId: string) {
    return this.firestore
      .collection('geoLocaleIps')
      .doc(documentId)
      .snapshotChanges();
  }

  public getIpsTrack() {
    return this.firestore.collection('geoLocaleIps').snapshotChanges();
  }

  public updateIpTrack(documentId: string, data: any) {
    return this.firestore
      .collection('geoLocaleIps')
      .doc(documentId)
      .set(data);
  }

  public getDataIp(ip) {
    return this.http.get<{ ip: string }>(
      `http://api.ipstack.com/${ip}?access_key=c5dbe95f0b625ca27a2f20c3d392d70e`
    );
  }
} 
