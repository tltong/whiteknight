import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';

import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { MemberServiceProvider } from '../../providers/member-service/member-service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;
  captureDataUrl: string; 
  photoString:string;

  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public ps: PhoneServiceProvider
    ,public ms:MemberServiceProvider
    ) {

      this.signupForm = formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        gender: ['',Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        description: [''],
        dob: ['',Validators.compose([Validators.required])]
      });
  }

  test() {
  //  const date = new Date(this.signupForm.value.dob);
  //    this.ps.presentToast(date.getMonth());
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

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
/*
      let member = this.ms.constructMember(this.signupForm.value.name,
                   this.signupForm.value.gender,this.signupForm.value.dob,
                   this.signupForm.value.email);

      if (this.signupForm.value.description != null) { 
        member = this.ms.updateDescription(member,this.signupForm.value.description);
      }
     
      this.ms.pushMember(member).then(id => { 
        if (this.photoString!=null) {
          this.ms.updateMemberPhoto(member,member.docID,this.photoString);
        }
      });
*/

      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {

        let member = this.ms.constructMember(this.signupForm.value.name,
                     this.signupForm.value.gender,this.signupForm.value.dob,
                     this.signupForm.value.email);

        if (this.signupForm.value.description != null) { 
          member = this.ms.updateDescription(member,this.signupForm.value.description);
        }
     
        this.ms.pushMember(member).then(id => { 
          if (this.photoString!=null) {
            this.ms.updateMemberPhoto(member,member.docID,this.photoString).then( () => {
              this.nav.setRoot(HomePage);
            });
          }
        });

      }, 
      (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      } // error
      );  // then
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      
    } //else


  } // function


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
