import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDisplayComponent } from './file-display/file-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule, FileUploadComponent, FileDisplayComponent],
})
export class AppComponent {
  title = 'amplify-angular-template';

  constructor(public authenticator: AuthenticatorService) {
  }
}
