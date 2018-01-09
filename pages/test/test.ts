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
  testtring: string;

  obj: Item;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ds:DataServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }


  push_data_fs() {
    this.obj = new Item(this.tb_fs_value1,this.tb_fs_value2);
    this.ds.pushDataFS(this.tb_collection,this.obj);
  }

  pull_data_fs() {
    this.items=this.ds.pullDataFS(this.tb_collection);
    this.items.subscribe(queriedItems => {
      this.testtring = "testing";
      this.testtring = queriedItems[5].title; 
   });

  }
}
