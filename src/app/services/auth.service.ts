import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { hasClassName } from '@ng-bootstrap/ng-bootstrap/util/util';
import { User } from 'firebase';

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
        }
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user!==null;
  }
}
