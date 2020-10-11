import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserData } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  DB = 'users';
  index:string = JSON.parse(localStorage.getItem('user')).uid;
  constructor(private db:AngularFirestore) { }

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
