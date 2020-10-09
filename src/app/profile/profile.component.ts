import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private userService:UserService) {
    userService.get().subscribe(response=>{
      console.log(response.data());
    });
  }

  ngOnInit(): void {
  }

}
