import { ChangeDetectorRef, Component, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDisplayComponent } from './file-display/file-display.component';
import { AuthTokens, AuthSession, AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, TodosComponent, AmplifyAuthenticatorModule, FileUploadComponent, FileDisplayComponent],
})
export class AppComponent implements OnInit {
  title = 'amplify-angular-template';
  isUploaderUser = signal(false);

  constructor(
    public authenticator: AuthenticatorService,
    private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const session = await fetchAuthSession();
      const rawGroups = session.tokens?.accessToken.payload?.['cognito:groups'];
      const groups = Array.isArray(rawGroups) ? rawGroups as string[] : [];
      this.isUploaderUser.set(groups.includes('Uploader'));
      this.cdr.detectChanges();
      console.log('User is in "Uploader" group:', this.isUploaderUser());
    } catch (err) {
      console.error('Error getting user session:', err);
    }
  }
}
