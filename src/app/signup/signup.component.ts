import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase';
import { UserData } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dof: new FormControl(''),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private auth: AuthService,private userService:UserService) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.signupForm.valid) {
      if (this.signupForm.get('password').value === this.signupForm.get('confirmPassword').value) {
        this.auth.signUp(this.signupForm.get('email').value, this.signupForm.get('password').value)
          .then(response =>{
            const UID:string = response.user.uid;
            const formValues:any = this.signupForm.getRawValue();
            delete formValues.password;
            delete formValues.confirmPassword;
            this.userService.create(formValues,UID);
          })
          .catch(err => console.error("error" + err));
      }
    }
  }
}
