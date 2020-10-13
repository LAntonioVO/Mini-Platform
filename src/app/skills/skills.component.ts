import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData} from '../interfaces/user.interface'
import { NgbModal } from "@ng-bootstrap//ng-bootstrap";
import { AlertService } from '../services/alert.service';
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skills:Array<object>;
  skillForm:FormGroup = new FormGroup({
    skill:new FormControl('',[Validators.required]),
    learned:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required,Validators.min(0)]),
    description:new FormControl('',[Validators.required])
  });

  constructor(private userService: UserService,public modal:NgbModal,public alert:AlertService) { }

  ngOnInit(): void {
    // this.userService.set({skills:["javascript"]});
  }
  addSkill(content){
    this.modal.open(content).result.then((result) => {
      let dataSkill:object=this.skillForm.getRawValue();
      this.userService.set({skills:[...this.skills,dataSkill]})
        .then(_=>{
          this.alert.success("Skills updated")
          this.skills.push(dataSkill);
        })
        .catch(err=>this.alert.error("Error updating skills"));
    }, (reason) => {
      this.alert.info("Add Skill Cancelled");
    });
  }
  editSkill(skill){
    console.log(skill);
  }
  deleteSkill(skill){
    console.log(this.skills.indexOf(skill));
  }
}
