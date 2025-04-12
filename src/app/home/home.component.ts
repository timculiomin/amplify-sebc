import { Component, HostListener, inject } from '@angular/core';
import { LanguageService } from '../shared/language.service';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  menuOpen = false;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    public languageService: LanguageService,
    private dialog: MatDialog,
    public authenticator: AuthenticatorService){}

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideMenu = (event.target as HTMLElement).closest('.mobile-menu');
    const clickedMenuButton = (event.target as HTMLElement).closest('#mobile-menu-btn');
    if (this.menuOpen && !clickedInsideMenu && !clickedMenuButton) {
      this.menuOpen = false;
    }
    if (this.menuOpen){
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  changeLanguage(){
    this.languageService.isRussian = !this.languageService.isRussian;
  }

  receiveDataFromChild(isActive: boolean) {
    this.menuOpen = isActive;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
      signIn() {
          this.dialog.open(AuthDialogComponent);
        }
      
        signOut() {
          this.authenticator.signOut();
        }
      
        isSignedIn() {
          return this.authenticator.authStatus === 'authenticated';
        }
}
