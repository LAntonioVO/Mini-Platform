import { prepareSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss']
})
export class InputPhoneComponent implements OnInit {
  constructor() { }
  @Input() phone: string = '';
  @Output() sendPhone = new EventEmitter<string>();
  mask: string = '';

  ngOnInit(): void {
    this.mask = this.phoneMask(this.phone);
  }

  keyUpMask(event): void {
    this.phone = this.phoneUnmask(event.target.value);
    if (event.key == "Backspace" && this.phone.length < 7) {
      this.phone = this.phone.substring(0, this.phone.length - 1);
    }
    this.mask = this.phoneMask(this.phone);
    this.phone = this.phoneUnmask(this.mask);
    this.sendPhone.emit(this.phone);
  }

  phoneMask(phone: string): string {
    if (phone.length <= 3) {
      phone = phone.replace(/^(\d{1,3}).*/, '($1)')
    } else if (phone.length <= 6) {
      phone = phone.replace(/^(\d{1,3})(\d{1,3}).*/, '($1) $2-')
    } else {
      phone = phone.replace(/^(\d{1,3})(\d{1,3})(\d{1,4}).*/, '($1) $2-$3')
    }
    return phone;
  }
  phoneUnmask(phoneMask: string): string {
    phoneMask = phoneMask.replace(/^0/, "");
    phoneMask = phoneMask.replace(/\D/g, "");
    return phoneMask;
  }
}
