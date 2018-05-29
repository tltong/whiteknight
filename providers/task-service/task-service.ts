import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataServicesProvider } from '../../providers/data-services/data-services';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { Task } from '../../dataclass/task';
import { Photo } from '../../dataclass/photo';

@Injectable()
export class TaskServiceProvider {

  readonly collectionName:string ="tasks";
  readonly photoCollectionName:string = "photo";
  readonly photoLocation = "task_photos";

  constructor(private ds:DataServicesProvider, private ps:PhoneServiceProvider) {
  }

  constructTask(title,description,difficulty,imageString):Task {
    let date = new Date().toISOString();
    let requesterID = this.ds.getCurrentUserEmail();
    let UID = this.ds.getCurrentUserUID();
    // default task state is 'open'
		return new Task(title,description,difficulty,date,requesterID,UID,imageString);  
  }


  pushTask(task:Task) {
    var promise = new Promise((resolve, reject) => {
    this.ds.pushDataFSPromise(this.collectionName,task).then ( id => {
      task.docID = <string>id;
      this.ds.updateDocumentPromise(this.collectionName,<string>id,task).then( function(id) {
        this.ps.presentToast('updated document');
      //resolve('updated');
      })
      .catch(function(error) {
      reject(error);
      });
      resolve(id);
    });
    });
    return promise;
  }

  updateTaskPhoto(task:Task) {

    var promise = new Promise((resolve, reject) => {
    let photoLocation = this.photoLocation + '/'+ task.docID+'.jpg';
    
    let uploadtask = this.ds.uploadImage(photoLocation,task.imageString);
    var photo = new Photo(photoLocation);
    this.ds.pushDataNestedCollection(this.collectionName,task.docID,this.photoCollectionName,photo).then(function(id) {
      resolve(id);
    })
    .catch(function(error) {
      reject(error);
    });
  
    });
    return promise;
  }


  updateCompletedData(task:Task,date):Task {
    task.completedDate=date;
    return task;
  }

  updateState(task:Task,state):Task {
    task.state=state
    return task;
  }
}
