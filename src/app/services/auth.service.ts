import { Injectable, NgZone } from '@angular/core';
import { User } from '../Entities/user';
import { User as FireUser} from 'firebase/auth' ; 
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any; 
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone 
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

   // Returns true when user is logged in and email is verified
   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get isVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified;
  }

  SignIn(email: string, password: string) : Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  // Sign up with email/password
  SignUp(user : User, password : string) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        this.SendVerificationMail();
        result.user!.updateProfile({displayName : user.nombre, photoURL : user.imagenes[0]})
        .then(()=>{
          this.SetUserData(result.user!.uid, user);
          this.router.navigate(['home']);
        });        
      })
  }

  SetUserData(uid : string, user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${uid}`
    );
    user.uid = uid;
    return userRef.set(Object.assign({},user), {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        // this.router.navigate(['verify-email-address']);
        console.log("correo de verificacion enviado");
      });
  }
  
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}