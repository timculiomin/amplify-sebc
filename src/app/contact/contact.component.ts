import { Component } from '@angular/core';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  hideForm = false;

  receiveDataFromChild(isActive: boolean) {
    this.hideForm = isActive;
  }

  constructor(public languageService: LanguageService){}
}