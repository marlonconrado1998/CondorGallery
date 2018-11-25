import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from './album.model';

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {

    constructor(
        private http: HttpClient
    ) { }

    getAlbums() {
        return this.http.get<Album[]>('http://localhost:3000/albums');
    }

    createAlbum(name) {
        return this.http.post('http://localhost:3000/album', {name: name});
    }
}