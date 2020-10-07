import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CallToActionsService {
  constructor(private firestore: AngularFirestore) {}

  public createData(data: any) {
    return this.firestore.collection('callToActions').add(data);
  }

  public getData(documentId: string) {
    return this.firestore
      .collection('callToActions')
      .doc(documentId)
      .snapshotChanges();
  }

  public getAllData(initDate = undefined, endDate = undefined) {
    if (initDate && endDate) {
      initDate.setHours(0, 0, 0, 0);
      endDate.setHours(24, 0, 0, 0);
      return this.firestore
        .collection('callToActions', ref =>
          ref.where('timestamp', '>', initDate).where('timestamp', '<', endDate)
        )
        .snapshotChanges();
    } else {
      return this.firestore.collection('callToActions').snapshotChanges();
    }
  }

  public updateData(documentId: string, data: any) {
    return this.firestore
      .collection('callToActions')
      .doc(documentId)
      .set(data);
  }
}
