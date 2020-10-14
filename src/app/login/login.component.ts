import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:Array<string>;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  submit():void{
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  goSignUp():void{
    this.router.navigate(['/signup']);
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
}
