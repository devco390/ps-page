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

  public getAllData() {
    return this.firestore.collection('callToActions').snapshotChanges();
  }

  public updateData(documentId: string, data: any) {
    return this.firestore
      .collection('callToActions')
      .doc(documentId)
      .set(data);
  }
}
