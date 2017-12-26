import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataServicesProvider } from '../../providers/data-services/data-services';

import { Item, ItemInterface } from '../../utils/item'



@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  tb_collection: string;
  tb_fs_value1: string;
  tb_fs_value2: string;

  objInt: ItemInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ds:DataServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }


  push_data_fs() {
    this.ItemInterface = new Item(this.tb_value1,this.tb_value2);
    this.ds.pushDataFS(this.tb_collection,this.ItemInterface);
  }


}
