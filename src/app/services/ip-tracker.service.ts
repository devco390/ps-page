import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  public createIpTrack(data: { ip: string; date: string }) {
    return this.firestore.collection('ipTrack').add(data);
  }

  public getIpTrack(documentId: string) {
    return this.firestore
      .collection('ipTrack')
      .doc(documentId)
      .snapshotChanges();
  }

  public getIpsTrack(initDate = undefined, endDate = undefined) {
    if (initDate && endDate) {
      initDate.setHours(0, 0, 0, 0);
      endDate.setHours(24, 0, 0, 0);
      return this.firestore
        .collection('ipTrack', ref =>
          ref.where('timestamp', '>', initDate).where('timestamp', '<', endDate)
        )
        .snapshotChanges();
    } else {
      return this.firestore.collection('ipTrack').snapshotChanges();
    }
  }

  public updateIpTrack(documentId: string, data: any) {
    return this.firestore
      .collection('ipTrack')
      .doc(documentId)
      .set(data);
  }
}
