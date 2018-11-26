import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { Image } from './shared/image.model';
import { ImageService } from './shared/image.service';

import { AlbumsService } from './../albums/shared/albums.service';
import { Album } from './../albums/shared/album.model';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: Image[]; // images list
  albums: Album[]; // album list

  nameFile: string; // name file to show in label file
  name: string; // [ngForm] new name typed from input name 

  paramId: string; // id param url
  paramAlbum: string; // album param url
  paramMethod: string;

  albumSeleced: Album; // album selected
  fileSelected: File; // File selected
  imageSelected: Image; // Image selected

  /*  loader have 3 states type number
   *  state 1 -> Is searching 
   *  state 2 -> Came data
   *  state 3 -> Did not come data
   */
  loader: number = 3; // handle loader, 
  loaderForm: boolean = false;

  dateFrom;
  dateTo;
  nameFilter;

  constructor(
    private imageService: ImageService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private albumsService: AlbumsService,
    private calendar: NgbCalendar
  ) {
  }


  ngOnInit() {

    // Url params
    this.paramMethod = this.route.snapshot.paramMap.get('method');
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.paramAlbum = this.route.snapshot.paramMap.get('album');

    if (this.paramMethod === 'byAlbum') {
      this.getImagesByAlbum();
    } else {
      this.getImages();
    }
  }

  // [change] take changes when select an image 
  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];
    this.nameFile = this.fileSelected.name;
  }

  // Save the selected image 
  saveImage() {

    if (!this.fileSelected || !this.name) {
      return false;
    }
    this.loaderForm = true;
    const fd = new FormData();
    fd.append('file', this.fileSelected, this.name);
    this.imageService.saveImage(fd).subscribe(resp => {
      this.loaderForm = false;
      if (this.paramId) {
        this.addImageToAlbum(resp['data']['id']);
      } else {
        this.getImages();
      }
      this.fileSelected = null;
      this.name = null;
      alert(resp['msg']);
      this.modalService.dismissAll();
    })
  }


  // Add an image to album
  addImageToAlbum(idimage) {
    if (!idimage || !this.paramId) {
      return false;
    }
    this.imageService.addImageToAlbum(this.paramId, idimage).subscribe(resp => {
      this.getImagesByAlbum();
    });
  }

  // Remove an image 
  removeImage(idimage) {
    this.imageService.removeImage(idimage)
      .subscribe(resp => {
        this.sliceImage(idimage);
        alert(resp['msg']);
      });
  }

  // Get every images 
  getImages() {
    this.images = [];
    this.loader = 1;
    this.imageService.getImages()
      .subscribe(images => {
        if (images && images.length > 0) {
          this.images = images
          this.loader = 2;
        } else {
          this.loader = 3;
        }
      });
  }


  // Get images from album
  getImagesByAlbum() {
    this.images = [];
    this.loader = 1;
    this.imageService.getImagesByAlbum(this.paramId)
      .subscribe(images => {
        if (images && images.length > 0) {
          this.images = images;
          this.loader = 2;
        } else {
          this.loader = 3;
        }
      });
  }

  // Remove an image from array this.images 
  sliceImage(idimage) {
    for (let i = 0; i < this.images.length; i++) {
      let image = this.images[i];
      if (image._id == idimage) {
        this.images.splice(i, 1);;
        if (this.images.length < 1) this.loader = 3;
      }
    }
  }


  // Open a modal 
  open(content, image?) {

    if (image) {
      this.imageSelected = image;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
    this.getAlbums();
  }


  // Get every albums
  getAlbums() {
    if (this.albums) {
      return false;
    }
    this.albumsService.getAlbums()
      .subscribe(albums => {
        if (albums && albums.length > 0) {
          this.albums = albums;
        }
      })
  }

  // Select an album 
  selectAlbum(album) {
    this.albumSeleced = <Album>album;
  }

  // Unselect an album
  unSelectAlbum() {
    this.albumSeleced = null;
    this.modalService.dismissAll();
  }

  // Add an image to album
  addToAlbum() {
    this.loaderForm = true;
    this.imageService.addImageToAlbum(this.albumSeleced['_id'], this.imageSelected['_id']).subscribe(resp => {
      this.loaderForm = false;
      alert(resp['msg']);
      this.getImages();
      this.modalService.dismissAll();
    });
  }


  // Remove an image from album
  removeFromAlbum(image) {
    this.imageService.removeFromAlbum(image)
      .subscribe(resp => {
        alert(resp['msg']);
        if (this.paramId) {
          this.getImagesByAlbum();
        } else {
          this.getImages();
        }
        this.modalService.dismissAll();
      })
  }

  // Seach images by filter 
  filterImage() {

    let from = "null";
    let to = "null";
    let name = "null";

    if (this.dateFrom) {
      from = `${this.dateFrom.year}-${this.dateFrom.month}-${this.dateFrom.day}`;
    }
    if (this.dateTo) {
      to = `${this.dateTo.year}-${this.dateTo.month}-${this.dateTo.day}`;
    }
    if (this.nameFilter) {
      name = this.nameFilter;
    }
    if (!this.dateFrom && !this.dateTo && !this.nameFilter) {
      this.getImages();
      return false;
    }

    this.loader = 1;
    this.imageService.filterImage(name, from, to)
      .subscribe(images => {
        if (images && images.length > 0) {
          this.images = images;
          this.loader = 2;
        }else{
          this.loader = 3;
        }
      });
  }

  // Clear dates selected in the search
  clearDate(date) {
    if (date === 'from') {
      this.dateFrom = null;
    } else {
      this.dateTo = null;
    }
  }
}
