import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {
  public navItems = [
    { link: '/home', labelEn: 'Home', labelRu: 'Главная' },
    { link: '#about-section', labelEn: 'About', labelRu: 'О нас' },
    { link: '/contact', labelEn: 'Contact', labelRu: 'Контакты' },
    { link: 'schedule', labelEn: 'Schedule', labelRu: 'Расписание' },
    { link: '/donate', labelEn: 'Donations', labelRu: 'Пожертвования' },
    { link: '/young-adults-ministry', labelEn: 'Young Adults Ministry', labelRu: 'Молодежное служение' }
  ];
  
  menuOpen = false;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(public languageService: LanguageService){}

  @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.isActiveChange.emit(this.menuOpen);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideMenu = (event.target as HTMLElement).closest(
      '.mobile-menu'
    );
    const clickedMenuButton = (event.target as HTMLElement).closest(
      '#mobile-menu-btn'
    );
    if (this.menuOpen && !clickedInsideMenu && !clickedMenuButton) {
      this.menuOpen = false;
      this.isActiveChange.emit(this.menuOpen);
    }
  }

  changeLanguage(){
    this.languageService.isRussian = !this.languageService.isRussian;
  }
}
