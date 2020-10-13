import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData } from '../interfaces/user.interface'
import { NgbModal } from "@ng-bootstrap//ng-bootstrap";
import { AlertService } from '../services/alert.service';
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skills: Array<object>;
  @Output() updateUserSkills = new EventEmitter();
  skillForm: FormGroup = new FormGroup({
    skill: new FormControl('', [Validators.required]),
    learned: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, public modal: NgbModal, public alert: AlertService) { }

  ngOnInit(): void {
    // this.userService.set({skills:["javascript"]});
  }
  openEditor(content, action, skillEdit?) {
    if (action === "edit") {
      this.skillForm.setValue({
        skill: skillEdit.skill,
        learned: skillEdit.learned,
        price: skillEdit.price,
        description: skillEdit.description
      });
    } else {
      this.skillForm.reset();
    }
    this.modal.open(content).result.then((result) => {
      if (action === "add") {
        this.addSkill();
      } else if (action === "edit") {
        this.editSkill(skillEdit);
      }
    }, (reason) => {
      this.alert.info("Skill Cancelled");
    });
  }
  addSkill() {
    let dataSkill: object = this.skillForm.getRawValue();
    this.userService.set({ skills: [...this.skills, dataSkill] })
      .then(_ => {
        this.alert.success("Skills updated")
        this.skills.push(dataSkill);
        this.updateUserSkills.emit(this.skills);
      })
      .catch(err => this.alert.error("Error updating skills"));
  }
  editSkill(skill) {
    let index: number = this.skills.indexOf(skill);
    if (index !== -1) {
      let dataSkill: object = this.skillForm.getRawValue();
      let newSkills: Array<object> = this.skills;
      newSkills[index] = dataSkill;
      this.userService.set({ skills: newSkills })
        .then(_ => {
          this.alert.success("Edited 1 skill");
          this.skills = newSkills;
          this.updateUserSkills.emit(this.skills);
        })
        .catch(err => this.alert.error("Error editing skill"));
    }
  }
  deleteSkill(skill) {
    let index: number = this.skills.indexOf(skill);
    if (index !== -1) {
      let newSkills: Array<object> = this.skills.filter(value => value != skill);
      this.userService.set({ skills: newSkills })
        .then(_ => {
          this.alert.success("Deleted 1 skill");
          this.skills = newSkills;
          this.updateUserSkills.emit(this.skills);
        })
        .catch(err => this.alert.error("Error deleting skill"));
    }
  }
}
