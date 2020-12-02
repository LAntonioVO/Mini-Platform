import { createHostListener } from '@angular/compiler/src/core';
import { Directive, ElementRef, Host, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { displayPartsToString } from 'typescript';

@Directive({
  selector: '[appFilterDisplay]'
})
export class FilterDisplayDirective {
  @HostBinding('class.border-primary') selected:boolean=false;
  constructor(private element: ElementRef,
    private renderer: Renderer2) { }

  @HostListener('change') onChange() {
    let skills: NodeList = document.querySelectorAll(".skill-row")
    if (this.element.nativeElement.checked) {
      skills.forEach(skill => {
        let price = this.getValuePrice(skill);
        if (price < 10) {
          this.renderer.setStyle(skill, "display", "none");
          this.selected=true;
        }
      });
    }else{
      skills.forEach(skill => {
        let price = this.getValuePrice(skill);
        if (price > 0 ) {
          this.renderer.setStyle(skill, "display", "table-row");
          this.selected=false;
        }
      });
    }
  }

  getValuePrice(skill):number{
    let price = skill.childNodes[2].childNodes[0].nodeValue;
    price = price.split(".")[0];
    price = price.replace(/^0/, "");
    price = price.replace(/\D/g, "");
    return parseFloat(price);
  }
}
