import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  getImages() {
    return this.http.get<Image[]>('http://localhost:3000/list_images');
  }

  getImagesByAlbum(idalbum) {
    return this.http.get<Image[]>(`http://localhost:3000/albums_images/${idalbum}`);
  }

  removeImage(idimage) {
    return this.http.delete(`http://localhost:3000/image/${idimage}`);
  }

  saveImage(fd) {
    return this.http.post(`http://localhost:3000/image`, fd);
  }

  addImageToAlbum(idalbum, idimage) {

    return this.http.post(`http://localhost:3000/add_to_album`, { idalbum, idimage });
  }

  removeFromAlbum(idimage) {
    return this.http.put(`http://localhost:3000/remove_from_album/${idimage._id}`, {});
  }
}
