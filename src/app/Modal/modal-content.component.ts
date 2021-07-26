import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content-component',
  template: `
    <div class="modal-body">
    <img src={{previewImage.url}} style="width:100%">
    <div class="media-body">
        <h5 class="mt-0 mb-1">{{previewImage.title}}</h5>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContent {
    @Input() previewImage:any;
  constructor(public activeModal: NgbActiveModal) {
      
  }
}