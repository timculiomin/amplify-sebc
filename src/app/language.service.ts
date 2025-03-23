import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageKey = 'isRussian';

  public get isRussian(): boolean {
    return localStorage.getItem(this.languageKey) === 'true';
  }

  public set isRussian(value: boolean) {
    localStorage.setItem(this.languageKey, value.toString());
  }

  constructor() {
    // Initialize the language setting if not already set
    if (localStorage.getItem(this.languageKey) === null) {
      localStorage.setItem(this.languageKey, 'false');
    }
  }
}
