import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// Make sure you have "@aws-amplify/storage" installed
import { list, getUrl } from 'aws-amplify/storage';

@Component({
  selector: 'app-file-display',
  templateUrl: './file-display.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FileDisplayComponent implements OnInit {
    imageUrls: string[] = [];
  
    async ngOnInit() {
      const listResult = await list({ path: 'picture-submissions/' });
      const files = listResult.items ?? [];
      for (const file of files) {
        const urlResult = await getUrl({ path: file.path });
        this.imageUrls.push(urlResult.url.toString());
      }
    }
  }
