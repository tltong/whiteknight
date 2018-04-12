import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTaskPage {

  public taskID:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.taskID = navParams.get("taskId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTaskPage');
  }

}
