import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { AlertData } from '../interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<AlertData>();
  constructor() {}
  onAlert(){
    return this.subject.asObservable();
  }
  error(message:string){
    const errorAlert:AlertData = {message:message,type:"danger"}
    this.subject.next(errorAlert);
  }

  success(message:string){
    const successAlert:AlertData = {message:message,type:"success"}
    this.subject.next(successAlert);
  }

  info(message:string){
    const successAlert:AlertData = {message:message,type:"info"}
    this.subject.next(successAlert);
  }

  warning(message:string){
    const successAlert:AlertData = {message:message,type:"warning"}
    this.subject.next(successAlert);
  }

}
