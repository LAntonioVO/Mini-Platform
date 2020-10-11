import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { UserData } from '../interfaces/user.interface';
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
  userForm:FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dof: new FormControl(''),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
  });


  constructor(private userService: UserService, public modalService: NgbModal, private alert:AlertService) {
    this.getUserData();
  }

  ngOnInit(): void {
  }

  getUserData(): void {
    this.userService.get().pipe(
      finalize(() => { this.loadingData = false })
    ).subscribe(response => {
      console.log(response.data());
      this.user = response.data() as UserData;
      // this.userService.set(this.user).then(res=>{
      //   console.log("SET:"+res);
      // })
    });
  }

  openEditor(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(`Closed with: ${result}`);
      this.updateProfile();
    }, (reason) => {
      this.alert.info("Updating profile cancelled");
    });
  }

  updateProfile() {
    // this.userService.set();
  }
}
