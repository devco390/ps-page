import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  public getIpsTrack() {
    return this.firestore.collection('ipTrack').snapshotChanges();
  }

  public updateIpTrack(documentId: string, data: any) {
    return this.firestore
      .collection('ipTrack')
      .doc(documentId)
      .set(data);
  }
}
