import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from './album.model';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {

    constructor(
        private http: HttpClient
    ) { }

    getAlbums() {
        return this.http.get<Album[]>(`${environment.uri}/albums`);
    }

    createAlbum(name) {
        return this.http.post(`${environment.uri}/album`, {name: name});
    }
}