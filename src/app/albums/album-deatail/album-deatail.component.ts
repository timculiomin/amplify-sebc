import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { list, getUrl, uploadData, remove } from 'aws-amplify/storage';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerDialogComponent } from '../image-viewer-dialog/image-viewer-dialog.component';

@Component({
  selector: 'app-album-deatail',
  templateUrl: './album-deatail.component.html',
  styleUrl: './album-deatail.component.css'
})
export class AlbumDeatailComponent implements OnInit {
  hideForm = false;
  albumName: string = '';
  imageItems: ImageItem[] = [];
  selectedFiles: File[] = [];
  showUploadSection = false;

  constructor(
    public languageService: LanguageService, 
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.albumName = this.route.snapshot.paramMap.get('albumName') || '';
    await this.loadImages();
  }

  async loadImages() {
    const result = await list({ path: `picture-submissions/${this.albumName}/` });
    const files = result.items ?? [];

    this.imageItems = [];

    for (const file of files) {
      if (!file.path.endsWith('.placeholder')) {
        const urlResult = await getUrl({ path: file.path });
        this.imageItems.push({ url: urlResult.url.toString(), path: file.path });
      }
    }

  }  

  receiveDataFromChild(isActive: boolean) {
    this.hideForm = isActive;
  }

  goBack() {
    this.router.navigate(['/photos']);
  }

  toggleUploadSection() {
    this.showUploadSection = !this.showUploadSection;
    if (!this.showUploadSection) this.selectedFiles = [];
  }

  onFileInputClick(input: HTMLInputElement) {
    input.click();
  }
  
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.selectedFiles = Array.from(input.files);
  }
  
  async uploadSelectedFiles() {
    if (!this.albumName || this.selectedFiles.length === 0) return;
  
    for (const file of this.selectedFiles) {
      const path = `picture-submissions/${this.albumName}/${file.name}`;
      await uploadData({
        path,
        data: file,
        options: {
          contentType: file.type,
        }
      });
    }
  
    this.selectedFiles = [];
    await new Promise((res) => setTimeout(res, 500));
    await this.loadImages();
  }

  async deleteImage(path: string) {
    await remove({ path });
    this.imageItems = this.imageItems.filter(i => i.path !== path);
  }

  openImage(index: number) {
    const images = this.imageItems.map(item => ({ url: item.url, key: item.path }));
    this.dialog.open(ImageViewerDialogComponent, {
      data: { images, index },
      panelClass: 'full-screen-dialog',
      hasBackdrop: true,
      backdropClass: 'dark-backdrop'
    });
  }
}

interface ImageItem {
  url: string;
  path: string;
}
