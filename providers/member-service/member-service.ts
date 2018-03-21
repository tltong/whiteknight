import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataServicesProvider } from '../../providers/data-services/data-services';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { Member } from '../../dataclass/member';
import { Photo } from '../../dataclass/photo';

@Injectable()
export class MemberServiceProvider {

  readonly collectionName:string ="users";
  readonly photoCollectionName:string = "photo";
 
  constructor(private ds:DataServicesProvider, private ps:PhoneServiceProvider ) {
  }

  constructMember(name:string,gender:string,dob:string,email:string):Member {
    return new Member(name,gender,dob,email);
  }

/* //promise template 
  var promise = new Promise((resolve, reject) => {

  <do something>
  .then(function(docRef) {
    resolve(docRef.id);
  })
  .catch(function(error) {
    reject(error);
  });
  
  });
  return promise;
*/

  pushMember(member:Member) {

    var promise = new Promise((resolve, reject) => {

    this.ds.pushDataFSPromise(this.collectionName,member).then ( id => {
      member.docID = <string>id;
      this.ds.updateDocumentPromise(this.collectionName,<string>id,member).then( function(id) {
        resolve(id);
      })
      .catch(function(error) {
      reject(error);
      });
      resolve(id);
    });
    });
    return promise;
  }  

  updateMemberPhoto(member:Member,docID:string,photoString:string) {

    var promise = new Promise((resolve, reject) => {

    var photo = new Photo(photoString);
    this.ds.pushDataNestedCollection(this.collectionName,docID,this.photoCollectionName,photo).then(function(id) {
      resolve(id);
    })
    .catch(function(error) {
      reject(error);
    });
  
    });
    return promise;

//    var photo = new Photo(photoString);
//    this.ds.pushDataNestedCollection(this.collectionName,docID,this.photoCollectionName,photo);

  }

  updateDocID(member:Member,docID:string):Member {
    member.docID = docID;
    return member;
  }

  

  updateDescription(member:Member,description:string):Member {
    member.description = description;
    return member;
  }


  test() {
    this.ps.presentToast('hello from member service');
  }
}
