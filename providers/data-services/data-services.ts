import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class DataServicesProvider {

  constructor(private afs: AngularFirestore) {
  }

  pushDataFS(collectionName:string,item:any) {
        this.afs.collection(collectionName).add(item).then(() => { console.log('Done');  })
 }


}
