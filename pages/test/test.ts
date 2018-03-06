import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DataServicesProvider } from '../../providers/data-services/data-services';

import { Item } from '../../utils/item'



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
 
  obj: Item;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ds:DataServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  file_upload() {
    this.ds.uploadImage(this.tb_upload_location,this.tb_upload_string);
  }


  file_download() {
    this.downloaded = this.ds.downloadImage(this.tb_upload_location);
  }

  push_data_fs() {
    this.obj = new Item(this.tb_fs_value1,this.tb_fs_value2);
    this.ds.pushDataFS(this.tb_collection,this.obj);
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
