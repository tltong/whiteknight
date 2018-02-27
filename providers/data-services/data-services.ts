import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import 'firebase/firestore';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';


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

  uploadImage(storageLocation:string,imageString:string) {
    storageRef = firebase.storage().ref(storageLocation);
    parseUpload = storageRef.putString(imageString, 'data_url');
  }  


  pushDataFS(collectionName:string,item:any) {
    
    this.itemsCollection = this.afs.collection<any>(collectionName);
    //this.itemsCollection.add({ singer: "the corr", name: "runaway" });
    this.itemsCollection.add(item.getData()); 
  }

  pullDataFS(collectionName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName);
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }


  pullDataFSSimpleQuery(collectionName:string,fieldName:string,valueName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName, ref => ref.where(fieldName,'==',valueName));
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }

  pullDataFSCompoundQuery(collectionName:string,fieldName1:string,valueName1:string,fieldName2:string,valueName2:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName, ref => ref.where(fieldName1,'==',valueName1).where(fieldName2,'==',valueName2));
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }



}
