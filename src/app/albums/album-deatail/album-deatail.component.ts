import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { list, getUrl, uploadData, remove } from 'aws-amplify/storage';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerDialogComponent } from '../image-viewer-dialog/image-viewer-dialog.component';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

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
  uploading = false;
  uploadProgress = 0;
  preparing = false;
  prepareProgress = 0;

  constructor(
    public languageService: LanguageService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

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
        if (!file.path.includes('/thumb_')) continue;

        const originalPath = file.path.replace('thumb_', '');
        const thumbUrl = (await getUrl({ path: file.path })).url.toString();

        this.imageItems.push({ url: thumbUrl, path: originalPath });

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

  async onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.preparing = true;
    this.prepareProgress = 0;

    const files: File[] = [];
    const inputFiles = Array.from(input.files);

    for (let i = 0; i < inputFiles.length; i++) {
      let file = inputFiles[i];
      let processedFile = file;

      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        try {
          const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' }) as Blob;
          processedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
            type: 'image/jpeg',
          });
        } catch (err) {
          console.error('HEIC conversion failed', err);
          continue;
        }
      }

      const thumb = await imageCompression(processedFile, {
        maxWidthOrHeight: 450,
        useWebWorker: true,
      });

      (processedFile as any).thumbnail = new File([thumb], 'thumb_' + processedFile.name, {
        type: thumb.type,
      });

      files.push(processedFile);
      this.prepareProgress = Math.round(((i + 1) / inputFiles.length) * 100);
      await new Promise(res => setTimeout(res)); 
    }

    this.selectedFiles = files;
    await new Promise(res => setTimeout(res, 300)); 
    this.prepareProgress = 0;
  }

  async uploadSelectedFiles() {
    if (!this.albumName || this.selectedFiles.length === 0) return;

    this.uploading = true;
    this.uploadProgress = 0;

    const total = this.selectedFiles.length;
    let completed = 0;

    const uploadTasks = this.selectedFiles.flatMap(file => {
      const f = file as any;
      const originalPath = `picture-submissions/${this.albumName}/${file.name}`;
      const thumbnailPath = `picture-submissions/${this.albumName}/thumb_${file.name}`;

      const originalUpload = uploadData({
        path: originalPath,
        data: file,
        options: { contentType: file.type }
      }).result.then(() => {
        completed++;
        this.uploadProgress = Math.round((completed / (total * 2)) * 100);
      });

      const thumbUpload = uploadData({
        path: thumbnailPath,
        data: f.thumbnail,
        options: { contentType: f.thumbnail.type }
      }).result.then(() => {
        completed++;
        this.uploadProgress = Math.round((completed / (total * 2)) * 100);
      });

      return [originalUpload, thumbUpload];
    });

    await Promise.all(uploadTasks);

    this.uploading = false;
    this.uploadProgress = 0;
    this.selectedFiles = [];

    await this.loadImages();

  }



  async deleteImage(path: string) {
    await Promise.all([
      remove({ path }),
      remove({ path: path.replace(/([^/]+)$/, 'thumb_$1') })
    ]);

    this.imageItems = this.imageItems.filter(i => i.path !== path);

    this.imageItems = this.imageItems.filter(i => i.path !== path);
  }

  async openImage(index: number) {
    const images = await Promise.all(
      this.imageItems.map(async (item) => {
        const fullUrl = (await getUrl({ path: item.path })).url.toString();
        return { url: fullUrl, key: item.path };
      })
    );

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
