import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlbumsService } from './../albums/shared/albums.service';
import { Album } from './../albums/shared/album.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  closeResult: string;
  album:Album = new Album('');

  constructor(
  ) { }

  ngOnInit() {
  }
}
