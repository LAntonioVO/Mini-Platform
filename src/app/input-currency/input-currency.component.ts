import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss']
})
export class InputCurrencyComponent implements OnInit {
  @Input() money:number;
  @Output() sendMoney = new EventEmitter();
  mask:string='';
  constructor() { }

  ngOnInit(): void {
    this.mask = this.moneyMask(`${this.money}`);
  }
  maskInput(event){
    this.mask = this.moneyMask(event.target.value);
    this.money = this.moneyUnmask(this.mask);
    this.sendMoney.emit(this.money);
  }
  moneyMask(money:string):string{
    money = money.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${money}`;
  }

  moneyUnmask(maskedMoney:string):number{
    maskedMoney = maskedMoney.replace(/^0/, "");
    maskedMoney = maskedMoney.replace(/\D/g, "");
    return +maskedMoney
  }

}
