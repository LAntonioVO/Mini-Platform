import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { UserData, UserForm } from '../interfaces/user.interface';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserData;
  loadingData: boolean = true;
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dof: new FormControl(''),
  });


  constructor(private userService: UserService, public modalService: NgbModal, private alert: AlertService) {
    this.getUserData();
  }

  ngOnInit(): void {
  }

  getUserData(): void {
    this.userService.get().pipe(
      finalize(() => { this.loadingData = false })
    ).subscribe(response => {
      this.user = response.data() as UserData;
    });
  }

  openEditor(content) {
    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      dof: this.user.dof
    });
    this.modalService.open(content).result.then((result) => {
      this.updateProfile();
    }, (reason) => {
      this.alert.info("Updating profile cancelled");
    });
  }

  updateProfile() {
    let userData: UserData = this.userForm.getRawValue();
    userData.email = this.user.email;
    this.userService.set(userData)
      .then(_ => {
        this.alert.success("Profile updating success!");
        this.user = userData;
      })
      .catch(err => {
        this.alert.error("Error updating profile");
      });
  }
}
