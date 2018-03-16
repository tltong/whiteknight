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

  constructor(private afs: AngularFirestore,public afstorage: AngularFireStorage
              ,public ps:PhoneServiceProvider
              ) {
  }

  downloadImage(storageLocation:string):Observable<string > {
    var profileUrl: Observable<any>;

    profileUrl = this.afstorage.ref(storageLocation).getDownloadURL();

//    var ref:AngularFireStorageReference = this.afstorage.ref(storageLocation);
  //  profileUrl = ref.getDownloadURL();
    return profileUrl;

  } 

  uploadImage(storageLocation:string,imageString:string):AngularFireUploadTask {
    let image = 'data:image/jpg;base64,' + imageString; 
    return this.afstorage.ref(storageLocation).putString(image,'data_url');
  }  


pushDataFSPromise(collectionName:string,item:any) {

  var promise = new Promise((resolve, reject) => {

  var itemsCollection: AngularFirestoreCollection<any>;
  itemsCollection = this.afs.collection<any>(collectionName);
  itemsCollection.add(item.getData()).then(function(docRef) {
    resolve(docRef.id);
  })
  .catch(function(error) {
    reject(error);
  });
  });
  return promise;
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

  pullDataSnapshotChangesFSSimpleQuery(collectionName:string,fieldName:string,valueName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName, ref => ref.where(fieldName,'==',valueName));

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.items;
  }
 
  pullDataSnapshotChangesFS(collectionName:string):Observable<any[]> {

    var itemsCollection: AngularFirestoreCollection<any>;
    var items: Observable<any[]>;

    itemsCollection = this.afs.collection<any>(collectionName);

    items = itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return items;
  }

  deleteDocument(collectionName:string, docID:string) {
    this.itemsCollection = this.afs.collection<any>(collectionName);
    this.itemsCollection.doc(docID).delete();    
  }

  updateDocumentPromise(collectionName:string, docID:string,item:any) {

    var promise = new Promise((resolve, reject) => {

      var itemsCollection: AngularFirestoreCollection<any>;
      itemsCollection = this.afs.collection<any>(collectionName);
      itemsCollection.doc(docID).update(item.getData()).then(function() {
      resolve();
       })
      .catch(function(error) {
       reject(error);
    });
    });
   return promise;
  }



}
