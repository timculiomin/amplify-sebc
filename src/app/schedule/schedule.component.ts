import { Component } from '@angular/core';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  hideForm = false;

  receiveDataFromChild(isActive: boolean) {
    this.hideForm = isActive;
  }
  
  constructor(public languageService: LanguageService){}
}