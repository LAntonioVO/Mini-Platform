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
  constructor(private db:AngularFirestore) { }

  create(user:UserData,UID:string):Promise<void>{
    return this.db.collection(this.DB).doc(UID).set(user);
  }
  get():Observable<firebase.firestore.DocumentSnapshot>{
    const index = localStorage.getItem('dbIndex');
    return this.db.collection(this.DB).doc(index).get();
  }
}
