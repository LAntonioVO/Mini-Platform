import { Component } from '@angular/core';
import { auth } from 'firebase';
import { AuthGuardService } from './services/auth-guard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bts-mini-platform';
  isLogged:boolean;
  // constructor(private authGuard:AuthGuardService){}


}
