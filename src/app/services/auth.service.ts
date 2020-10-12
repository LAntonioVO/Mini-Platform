import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,public alert:AlertService,public router:Router,public ngZone:NgZone) {
      console.log("se contruyo  ")
      this.afAuth.authState.subscribe(user=>{
        console.log("suscriptor");
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          if(this.router.routerState.snapshot.url=="/login"){
            this.router.navigate(['/dashboard']);
          }
        }
        else{
          localStorage.setItem('user',null);
          localStorage.removeItem('dbIndex');
        }
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res=>{
        this.alert.success("Welcome back!");
      })
      .catch(err=>this.alert.error("Email or password incorrect"))
  }

  signUp(email: string, password: string):Promise<firebase.auth.UserCredential>{
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }

  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  resetPassword(email:string): Promise<void>{
    return this.afAuth.sendPasswordResetEmail(email)
  }

  isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user!=null);
    return user!=null;
  }
}
