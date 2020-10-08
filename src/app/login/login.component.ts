import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:boolean=false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(6)
    ])
  });
  constructor(private authService: AuthService, public router:Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(response => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => this.error=true);
  }

  get email() {
    return this.loginForm.get('email');
  }
}
