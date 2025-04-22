import { ChangeDetectorRef, Component, effect, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDisplayComponent } from './file-display/file-display.component';
import { AuthTokens, AuthSession, AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { CommonModule, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SEBC';

  constructor(
    public authenticator: AuthenticatorService,
    private cdr: ChangeDetectorRef,
    private router: Router, 
    private viewportScroller: ViewportScroller,
    private userService: UserService 
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      if (tree.fragment) {
        this.viewportScroller.scrollToAnchor(tree.fragment);
      }
    });
  }

  async ngOnInit() {
    try {
      const session = await fetchAuthSession();
      const rawGroups = session.tokens?.accessToken.payload?.['cognito:groups'];
      const groups = Array.isArray(rawGroups) ? rawGroups as string[] : [];
      this.userService.isUploaderUser.set(groups.includes('Uploader') || groups.includes('admin'));
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Error getting user session:', err);
    }
  }
}
