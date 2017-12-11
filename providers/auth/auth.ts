import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) { }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
  
  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }
}
