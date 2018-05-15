import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { DataServicesProvider } from '../../providers/data-services/data-services';

import { TaskServiceProvider } from '../../providers/task-service/task-service';

import { Task } from '../../dataclass/task';


@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {

  public taskForm: FormGroup;
  captureDataUrl: string; 
  photoString:string = 'ABCD';


  constructor(public formBuilder:FormBuilder,public ps:PhoneServiceProvider,
              public ts:TaskServiceProvider,public ds:DataServicesProvider) {

    this.taskForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      difficulty: ['',Validators.compose([Validators.required])],
      docID: ['',Validators.compose([Validators.required])]

    });    

    this.taskForm.controls["title"].setValue('task');
    this.taskForm.controls["description"].setValue('do stuff');
    this.taskForm.controls["difficulty"].setValue('Difficult');

  }


  photo() {

    const title='photo';
    const subtitle='photo';
    const camera = 'camera';
    const gallery = 'gallery';


    this.ps.presentOptions(title,subtitle,camera,gallery).then( selected  =>
      {
        if (selected == camera) {
          this.ps.takePhoto().then(imageData=> {
            this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
            this.photoString=<string>imageData;
          });
        }else if (selected == gallery) {
          this.ps.selectPhotoFromGallery().then(imageData=> {
            this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
            this.photoString=<string>imageData;
          });
          this.ps.presentToast('gallery selected');
        }
      });    
 
  }


  test() {

//    this.ps.presentToast(this.ds.getCurrentUserEmail());
//    this.ps.presentToast(new Date().toISOString());
  }

  createTask() {
    let task = this.ts.constructTask(this.taskForm.value.title,
                                     this.taskForm.value.description,
                                     this.taskForm.value.difficulty,
                                     this.photoString
                                    );
    this.ts.pushTask(task).then (id => { 

     
      this.ts.setTaskDocID(task,<string>id).then (id =>{
        this.ps.presentToast('updated');
      });

  


      //this.taskForm.controls["docID"].setValue(<string>id);
      //this.ps.presentToast(<string>id); 
      

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTaskPage');
  }

}
