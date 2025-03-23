import { Component } from '@angular/core';
import { uploadData } from 'aws-amplify/storage';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    if (!this.selectedFile) return;
    try {
      // Option 1: Directly pass the File object
      await uploadData({
        data: this.selectedFile,
        path: `picture-submissions/${this.selectedFile.name}`,
      });
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  }
  
}
