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

  logout() {
    this.authData.logoutUser();
  }

}
