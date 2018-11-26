import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Image } from './image.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  getImages() {
    return this.http.get<Image[]>(`${environment.uri}/list_images`);
  }

  getImagesByAlbum(idalbum) {
    return this.http.get<Image[]>(`${environment.uri}/albums_images/${idalbum}`);
  }

  removeImage(idimage) {
    return this.http.delete(`${environment.uri}/image/${idimage}`);
  }

  saveImage(fd) {
    return this.http.post(`${environment.uri}/image`, fd);
  }

  addImageToAlbum(idalbum, idimage) {

    return this.http.post(`${environment.uri}/add_to_album`, { idalbum, idimage });
  }

  removeFromAlbum(idimage) {
    return this.http.put(`${environment.uri}/remove_from_album/${idimage._id}`, {});
  }

  filterImage(name, from, to) {
    return this.http.get<Image[]>(`${environment.uri}/filter_image/${name}/${from}/${to}`, {});
  }
}
