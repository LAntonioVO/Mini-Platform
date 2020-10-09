import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { UserData } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:UserData;
  constructor(public userService:UserService) {
    // this.userService.get().subscribe(data=>{
    //   this.user = data.data() as UserData;
    //   console.log(this.user);
    // });
    
  }

  ngOnInit(): void {
  }

}
