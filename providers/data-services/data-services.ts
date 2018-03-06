import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import 'firebase/firestore';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
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

  constructor(private afs: AngularFirestore,public afstorage: AngularFireStorage) {
  }

  downloadImage(storageLocation:string):Observable<string > {
    var profileUrl: Observable<any>;

    profileUrl = this.afstorage.ref(storageLocation).getDownloadURL();

//    var ref:AngularFireStorageReference = this.afstorage.ref(storageLocation);
  //  profileUrl = ref.getDownloadURL();
    return profileUrl;

  } 
  
  uploadImage(storageLocation:string,imageString:string) {

  //  let filePath = `my-pet-crocodile_${ new Date().getTime() }.jpg`;
    let image = 'data:image/jpg;base64,' + imageString; 


    this.afstorage.ref(storageLocation).putString(image,'data_url');
//    this.afstorage.ref(storageLocation).putString(imageString,'data_url');

/*
//  firebase
    let storageRef = firebase.storage().ref(storageLocation);
    let parseUpload = storageRef.putString(imageString, 'data_url');
*/

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
