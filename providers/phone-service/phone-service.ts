import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class PhoneServiceProvider {

  constructor (private toastCtrl: ToastController,
               private alertCtrl: AlertController,
               private camera: Camera) {
  }

  takePhoto() {
    var promise = new Promise((resolve, reject) => {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then(function(imageData) {
      resolve(imageData);
    })
    .catch(function(error) {
      reject(error);
    });
    
    });
    return promise;
  }

  selectPhotoFromGallery() {
    var promise = new Promise((resolve, reject) => {

    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(function(imageData) {
      resolve(imageData);
    })
    .catch(function(error) {
      reject(error);
    });
    
    });
    return promise;
  }





  presentAlert(title,subtitle,button) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: subtitle,
    buttons: [button]
  });
  alert.present();
  }

  // Toast
  presentToast(msg:string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
  });
  toast.present();
  }

  presentConfirm(title,message) {
  var promise = new Promise((resolve, reject) => {
  let alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          resolve();
        }
      }
    ]
  });
  alert.present();
  })
  .catch(function(error) {
//    reject(error);
  });
 return promise;
  }


  presentOptions(title,message,option1,option2) {
  var promise = new Promise((resolve, reject) => {
  let alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [
      {
        text: option1,
        handler: () => {
          resolve(option1);
        }
      },
      {
        text: option2,
        handler: () => {
          resolve(option2);
        }
      }
    ]
  });
  alert.present();
  })
  .catch(function(error) {
//    reject(error);
  });
  return promise;
  }





}
