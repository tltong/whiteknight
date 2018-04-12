import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login'
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tb_text:string;
  constructor(public navCtrl: NavController,public authData: AuthProvider) {
    firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        navCtrl.setRoot('LoginPage');
      }
    });
  }

  goToTestPage() {
    this.navCtrl.push('TestPage');
  }

  goToCreateTaskPage() {
    this.navCtrl.push('CreateTaskPage');
  }

  goToEditTaskPage() {
    this.navCtrl.push('EditTaskPage',{taskId:this.tb_text });
  }


  logout() {
    this.authData.logoutUser();
  }

}
