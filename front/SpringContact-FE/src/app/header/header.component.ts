import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';
import { ContactService } from '../contact/services/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('contactForm')

  contactForm = NgForm;
  modalSup: BsModalRef;

  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit() {
  }

  addContact(template: TemplateRef<any>) {
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }

  createOrUpdateContact() {
    this.modalSup.hide();
  }

  filter(value){
    this.contactService.setFiltering(value);
  }

}
