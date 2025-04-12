import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { list, getUrl, uploadData, remove, downloadData } from 'aws-amplify/storage';

export interface ImageViewerData {
  images: { url: string; key: string }[];
  index: number;
}

@Component({
  selector: 'app-image-viewer-dialog',
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.css'],
})
export class ImageViewerDialogComponent {
  currentIndex: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageViewerData,
    private dialogRef: MatDialogRef<ImageViewerDialogComponent>, 
  ) {
    this.currentIndex = data.index;
  }

  @HostListener('document:keydown.arrowright')
  nextImage() {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    }
  }

  @HostListener('document:keydown.arrowleft')
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  async downloadImage() {
    const image = this.data.images[this.currentIndex];
    try {
      const downloadResult = await downloadData({ path: image.key });
      const blob = (await (await downloadResult.result).body.blob());
      
      const filename = decodeURIComponent(image.key.split('/').pop() || 'image.jpg');
      
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Download failed', error);
    }
  }

  close() {
    this.dialogRef.close();
  }

  swipeStartX: number = 0;
  swipeEndX: number = 0;

  onTouchStart(e: TouchEvent) {
    this.swipeStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    this.swipeEndX = e.changedTouches[0].clientX;
    const diff = this.swipeEndX - this.swipeStartX;
    if (diff > 50) this.prevImage();
    else if (diff < -50) this.nextImage();
  }
}
