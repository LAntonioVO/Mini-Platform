import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertData } from '../interfaces/alert.interface';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alert: AlertData;
  alerts: Subscription;
  constructor(public alertService: AlertService) {
    this.alerts = this.alertService.onAlert().subscribe(message => {
      this.alert = message;
      setTimeout(() => {
        this.alert = null;
      }, 3000);
    });
  }


  ngOnInit(): void {
  }

}
