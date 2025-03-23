import { Component } from '@angular/core';
import { uploadData, getUrl, list } from 'aws-amplify/storage';

@Component({
  selector: 'app-album',
  standalone: true,
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  selectedFile: File | null = null;
  imageUrls: string[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  async upload() {
    if (!this.selectedFile) return;

    const fileName = `albums/${Date.now()}-${this.selectedFile.name}`;
    const arrayBuffer = await this.selectedFile.arrayBuffer();

    await uploadData({
      path: fileName,
      data: arrayBuffer,
      options: {
        contentType: this.selectedFile.type
      }
    });

    const url = await getUrl({ path: fileName });
    this.imageUrls.push(url.url.toString()); 
  }
}
