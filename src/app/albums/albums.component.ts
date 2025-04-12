import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../shared/language.service';
import { list, getUrl, uploadData, remove } from 'aws-amplify/storage';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  hideForm = false;
  albums: string[] = [];
  albumName: string = '';
  
  constructor(
    public languageService: LanguageService, 
    public userService: UserService, 
    private router: Router
  ){}
  
  
  async ngOnInit() {
    const result = await list({ path: 'picture-submissions/' });
    const files = result.items ?? [];
  
    const albumSet = new Set<string>();
    for (const file of files) {
      const parts = file.path.split('/');
      if (parts.length > 1 && parts[1] && !parts[1].includes('.')) {
        albumSet.add(parts[1]);
      }
    }
  
    this.albums = Array.from(albumSet);
  }

  receiveDataFromChild(isActive: boolean) {
    this.hideForm = isActive;
  }

  async createAlbum() {
    if (!this.albumName.trim() || this.albums.includes(this.albumName.trim())) {
      return;
    }
  
    const folderPath = `picture-submissions/${this.albumName.trim()}/.placeholder`;
    await uploadData({
      path: folderPath,
      data: new Blob(['']),
      options: {
        contentType: 'text/plain'
      }
    });
    
    this.albums.push(this.albumName.trim());
    this.albumName = '';
  }

  async deleteAlbum(albumName: string) {
    const albumPath = `picture-submissions/${albumName}/`;
    const result = await list({ path: albumPath });
    const files = result.items ?? [];
  
    for (const file of files) {
      await remove({ path: file.path });
    }

    this.albums = this.albums.filter(a => a !== albumName);
  }
  
goToAlbum(albumName: string) {
  this.router.navigate(['/photos', albumName]);
}

}
