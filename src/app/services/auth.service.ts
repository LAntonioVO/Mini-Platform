import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  login(email:string, password:string):Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

}
