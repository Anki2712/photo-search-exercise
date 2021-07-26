import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';
import { FlickrService } from '../services/flickr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../Modal/modal-content.component';


@Component({
  selector: 'app-search-picture',
  templateUrl: './search-picture.component.html',
  styleUrls: ['./search-picture.component.css']
})
export class SearchPictureComponent implements OnInit {
  images: any;
  keyword: string = "";
  showLoader: boolean = false;
  previewImage: any;
  constructor(private flickrService: FlickrService, private modalService: NgbModal) {

  }

  searchImage(event: any) {
    this.showLoader = true;
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword !== undefined && this.keyword.length > 0) {
      this.flickrService.searchPhoto(this.keyword).subscribe(res => {
        this.images = res;
        this.showLoader = false
      })
    }
  }

  onScroll() {
    if (this.keyword !== undefined && this.keyword.length > 0) {
      this.flickrService.searchPhoto(this.keyword).subscribe(res => {
        this.images = res;
        this.images = [...this.images, ...res]
      })
    }
  }

  showDetail(image: any) {
    this.previewImage = image;
    const modalRef = this.modalService.open(NgbdModalContent, this.previewImage);
    modalRef.componentInstance.previewImage = this.previewImage;
  }

  ngOnInit(): void {
  }

}
