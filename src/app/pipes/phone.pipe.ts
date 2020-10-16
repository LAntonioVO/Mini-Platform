import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phone: string): string {
    if (phone.length <= 3) {
      phone = phone.replace(/^(\d{1,3}).*/, '($1)')
    } else if (phone.length <= 6) {
      phone = phone.replace(/^(\d{1,3})(\d{1,3}).*/, '($1) $2-')
    } else {
      phone = phone.replace(/^(\d{1,3})(\d{1,3})(\d{1,4}).*/, '($1) $2-$3')
    }
    return phone;
  }

}
