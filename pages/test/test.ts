import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DataServicesProvider } from '../../providers/data-services/data-services';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { MemberServiceProvider } from '../../providers/member-service/member-service';

import { AngularFireStorage } from 'angularfire2/storage';

import { Item } from '../../utils/item'
import { Member } from '../../dataclass/member'

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  tb_collection: string;
  tb_fs_value1: string;
  tb_fs_value2: string;

  tb_upload_location:string;
  tb_upload_string:string;

  tb_fs_fieldName1: string;
  tb_fs_fieldValue1: string;
  tb_fs_fieldName2: string;
  tb_fs_fieldValue2: string;

  testtring: string;

  downloaded: Observable<string | null>;
  captureDataUrl: string; 
  photo: string;
  uploadPercent: Observable<number>;

  obj: Item;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public ds:DataServicesProvider, public ps: PhoneServiceProvider
  ,private ms:MemberServiceProvider
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  take_photo() {

    const title='photo';
    const subtitle='photo';
    const camera = 'camera';
    const gallery = 'gallery';

    this.ps.presentOptions(title,subtitle,camera,gallery).then( selected  =>
      {
        if (selected == camera) {
          this.ps.takePhoto().then(imageData=> {
            this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
            this.photo = <string>imageData;
          });
        }else if (selected == gallery) {
          this.ps.selectPhotoFromGallery().then(imageData=> {
            this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
            this.photo = <string>imageData;
          });
          this.ps.presentToast('gallery selected');
        }
      });
  }

  test_member() {
   
    var mbr = this.ms.constructMember('TL','male','18-08-76','tltong');
    mbr = this.ms.updateDescription(mbr,'good');
    this.ms.pushMember("users",mbr).then(id => {
      this.ps.presentToast(<string>id);});
    
//    this.ps.presentToast(mbr.description);    

  }

  upload_photo() {
    const task = this.ds.uploadImage(this.tb_upload_location,this.photo);
    this.uploadPercent=task.percentageChanges();
  }


  file_upload() {
    this.ds.uploadImage(this.tb_upload_location,this.tb_upload_string);
  }


  file_download() {
    this.downloaded = this.ds.downloadImage(this.tb_upload_location);
  }

  push_data_fs() {
    this.obj = new Item(this.tb_fs_value1,this.tb_fs_value2);
    this.ds.pushDataFSPromise(this.tb_collection,this.obj).then(id => { this.ps.presentToast(<string>id);   });
  }

  pull_data_fs_simple() {
    this.items=this.ds.pullDataFSSimpleQuery(this.tb_collection,this.tb_fs_fieldName1,this.tb_fs_fieldValue1);
    //this.items=this.ds.pullDataFSCompoundQuery(this.tb_collection,this.tb_fs_fieldName1,this.tb_fs_fieldValue1,this.tb_fs_fieldName2,this.tb_fs_fieldValue2);
    this.items.subscribe(queriedItems => {
      this.testtring = queriedItems[0].title; 
   });

  }

  pull_data_fs_compound() {
    this.items=this.ds.pullDataFSCompoundQuery(this.tb_collection,this.tb_fs_fieldName1,this.tb_fs_fieldValue1,this.tb_fs_fieldName2,this.tb_fs_fieldValue2);
    this.items.subscribe(queriedItems => {
      this.testtring = queriedItems[0].title;
   });

  }



}
