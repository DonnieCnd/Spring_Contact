import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('contactForm')

  contactForm = NgForm;
  modalSup: BsModalRef;
  updating = false;

  constructor(private _MODAL_SERVICE: BsModalService) { }

  ngOnInit() {
  }

  addContact(template: TemplateRef<any>) {
    this.updating = false;
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }
  openUpdateModal(template: TemplateRef<any>) {
    this.updating = true;
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }

  createOrUpdateSupplier() {
    this.modalSup.hide();
  }

}
