import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { hasClassName } from '@ng-bootstrap/ng-bootstrap/util/util';
import { User } from 'firebase';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router) {
      this.afAuth.user.subscribe(user=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
           this.router.navigate(['/dashboard']);
        }
        else{
          localStorage.setItem('user',null);
<<<<<<< HEAD
<<<<<<< HEAD
          this.router.navigate(['/dashboard']);
=======
          localStorage.removeItem('dbIndex');
>>>>>>> 7d4cd76... signup module finish
=======
          localStorage.removeItem('dbIndex');
>>>>>>> signup-component
        }
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> signup-component

  signUp(email: string, password: string):Promise<firebase.auth.UserCredential>{
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }

<<<<<<< HEAD
>>>>>>> 7d4cd76... signup module finish
=======
>>>>>>> signup-component
  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user!==null;
  }
}
