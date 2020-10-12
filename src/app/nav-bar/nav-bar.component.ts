import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(private auth:AuthService, public router:Router) { }

  ngOnInit(): void {
  }

  signOut(){
    this.auth.signOut().then(_=>{
      this.router.navigate(['/login']);
    });
  }
}
