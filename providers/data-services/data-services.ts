import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireModule } from 'angularfire2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class DataServicesProvider {

  private itemsCollection: AngularFirestoreCollection<any>;
  private items: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
  }

  pushDataFS(collectionName:string,item:any) {
    
    this.itemsCollection = this.afs.collection<any>(collectionName);
    //this.itemsCollection.add({ singer: "the corr", name: "runaway" });
    this.itemsCollection.add(item.getData()); 
  }

  pullDataFS(collectionName:string) {
    this.itemsCollection = this.afs.collection<any>(collectionName);  
    this.items = this.itemsCollection.valueChanges();
  }


}
