import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AlbumsService } from './../albums/shared/albums.service';
import { Album } from './../albums/shared/album.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  closeResult: string;
  album: Album = new Album('');
  dateFrom: NgbDateStruct;
  dateTo: NgbDateStruct;
  nameFile: string;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  search() {
    let from = 'null';
    let to = 'null';

    if (this.dateFrom) {
      from = `${this.dateFrom.year}-${this.dateFrom.month}-${this.dateFrom.day}`;
    }
    if (this.dateTo) {
      to = `${this.dateTo.year}-${this.dateTo.month}-${this.dateTo.day}`;
    }

    if (!this.dateFrom && !this.dateTo && !this.nameFile) {
      return false;
    }
    this.location.go(`/images/filter/${this.nameFile}/${from}/${to}`);
  }

  clearDate(date) {
    if (date === 'from') {
      this.dateFrom = null;
    } else {
      this.dateTo = null;
    }
  }
}
// 