import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

  param: string; // id param url
  album: string; // album param url

  albumSeleced: Album; // album selected
  fileSelected: File; // File selected
  imageSelected: Image; // Image selected

  constructor(
    private imageService: ImageService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) {
  }


  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('id');
    this.album = this.route.snapshot.paramMap.get('album');
    if (this.param) {
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
    const fd = new FormData();
    fd.append('file', this.fileSelected, this.name);
    this.imageService.saveImage(fd).subscribe(resp => {
      if (this.param) {
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
    if (!idimage || !this.param) {
      return false;
    }
    this.imageService.addImageToAlbum(this.param, idimage).subscribe(resp => {
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
    this.imageService.getImages()
      .subscribe(images => this.images = images);
  }


  // Get images from album
  getImagesByAlbum() {
    this.images = [];
    this.imageService.getImagesByAlbum(this.param)
    .subscribe(images => this.images = images);
  }

  // Remove an image from array this.images 
  sliceImage(idimage) {
    for (let i = 0; i < this.images.length; i++) {
      let image = this.images[i];
      if (image._id == idimage) {
        this.images.splice(i, 1);;
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
  getAlbums () {

    if (this.albums) {
      return false;
    }
    this.albumsService.getAlbums()
    .subscribe(albums => {
      this.albums = albums;
    })
  }

  // Select an album 
  selectAlbum(album) {
    this.albumSeleced = <Album>album;
  }

  // Unselect an album
  unSelectAlbum () {
    this.albumSeleced = null;
    this.modalService.dismissAll();
  }

  // Add an image to album
  addToAlbum() {
    this.imageService.addImageToAlbum(this.albumSeleced._id, this.imageSelected._id).subscribe( resp => {
      alert(resp['msg']);
      this.getImages();
      this.modalService.dismissAll();
    });
  }


  // Remove an image from album
  removeFromAlbum (image) {
    this.imageService.removeFromAlbum(image).subscribe( resp => {
      alert(resp['msg']);
      if (this.param) {
        this.getImagesByAlbum();
      } else {
        this.getImages();
      }
      this.modalService.dismissAll();
    })
  }
}
