import { Component } from '@angular/core';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-young-adults-ministry',
  templateUrl: './young-adults-ministry.component.html',
  styleUrls: ['young-adults-ministry.component.css']
})
export class YoungAdultsMinistryComponent {
  hideForm = false;

  receiveDataFromChild(isActive: boolean) {
    this.hideForm = isActive;
  }
  constructor(public languageService: LanguageService){}
}