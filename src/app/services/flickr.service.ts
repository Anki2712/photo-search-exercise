import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  previousKeyword: String='';
  startPage: number = 1;
  constructor(public http: HttpClient) { }

  searchPhoto(keyword: String):Observable<any> {
    if (this.previousKeyword === keyword) {
      this.startPage++;
    } else {
      this.startPage = 1;
    }
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    //`api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}`;
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=10&page=${this.startPage}`;
    this.previousKeyword = keyword;
 
    return this.http.get<FlickrOutput>(url + params).pipe(map((res: FlickrOutput) => {
      
      const photoArray: any[] = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`,
          title: ph.title
        };
        photoArray.push(photoObj);
      });
      return photoArray;
    }));
  }
}
