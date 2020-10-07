import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[
      Validators.required,
      Validators.min(6)
    ])
  });
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(){
    /*this.authService.login("elvera1199@gmail.com","119900")
    .then(response=>console.log("ENtrando"+response))
    .catch(err=>console.error("error"+err));*/
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
  }

  get email(){
    return this.loginForm.get('email');
  }
}
