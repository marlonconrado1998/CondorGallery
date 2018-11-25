import { Component, OnInit } from '@angular/core';
import { AlbumsService } from './shared/albums.service';
import { Album } from './shared/album.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  closeResult: string;
  albums: Album[];
  album: Album = new Album('');

  constructor(
    private albumsService: AlbumsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albumsService.getAlbums()
      .subscribe(albums => this.albums = albums);
  }

  createAlbum() {
    this.albumsService.createAlbum(this.album.name)
      .subscribe(resp => {
        this.album.name = null;
        this.modalService.dismissAll();
        this.getAlbums();
        alert(resp['msg']);
      })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }
}
