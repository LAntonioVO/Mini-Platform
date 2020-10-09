import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserData } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  loadingData:boolean = true;
  constructor(private userService:UserService) {
    this.getUserData();
  }

  ngOnInit(): void {
  }

  getUserData():void{
    this.userService.get().pipe(
     finalize(()=>{this.loadingData=false})
    ).subscribe(response=>{
      console.log(response.data());
      this.user = response.data();
    })
  }
}
