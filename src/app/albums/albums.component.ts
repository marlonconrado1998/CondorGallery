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

  /*  loader have 3 states type number
   *  state 1 -> Is searching 
   *  state 2 -> Came data
   *  state 3 -> Did not come data
   */
  loader: number = 3; // handle loader, 
  loaderForm: boolean = false;

  constructor(
    private albumsService: AlbumsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.loader = 1;
    this.albumsService.getAlbums()
      .subscribe(albums => {
        if (albums && albums.length > 0) {
          this.albums = albums;
          this.loader = 2;
        }else{
          this.loader = 3;
        }
      });
  }

  createAlbum() {

    if (!this.album.name) {
      return false;
    }
    this.loaderForm = true;
    this.albumsService.createAlbum(this.album.name)
      .subscribe(resp => {
        this.album.name = null;
        this.loaderForm = false;
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
