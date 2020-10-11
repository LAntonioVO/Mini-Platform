import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  DB:string = 'users';
  index:string;
  constructor(private db:AngularFirestore, private auth:AuthService) {
    const user = localStorage.getItem('user');
    if(user!="null"){
    this.index = JSON.parse(user).uid;
    }
  }

  create(user:UserData,UID:string):Promise<void>{
    return this.db.collection(this.DB).doc(UID).set(user);
  }
  get():Observable<firebase.firestore.DocumentSnapshot>{
    return this.db.collection(this.DB).doc(this.index).get();
  }
  set(data:UserData):Promise<void>{
    return this.db.collection(this.DB).doc(this.index).update(data);
  }
}
