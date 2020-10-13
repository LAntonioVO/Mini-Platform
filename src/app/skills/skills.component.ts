import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  data = [
    { skill: "javascript", date: "12-12-1998", price: "34", description: "delicious" },
    {skill:"javascript",date:"12-12-1998",price:"36",description:"delicious component with a mayor loremaksdjhf aslkdjhasldkfjhsa dlfkjsahdf"},
    {skill:"javascript",date:"12-12-1998",price:"37",description:"delicious"},
    {skill:"javascript",date:"12-12-1998",price:"38",description:"delicious"},
    {skill:"javascript",date:"12-12-1998",price:"35",description:"delicious"},
  ]

  constructor() { }

  ngOnInit(): void {
  }
  editSkill(skill){
    console.log(skill);
  }
}
