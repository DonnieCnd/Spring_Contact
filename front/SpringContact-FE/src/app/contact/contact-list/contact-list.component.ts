import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ContactService } from '../services/contact.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  @ViewChild('contactForm')

  contactForm = NgForm;
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;

  constructor(private contactService: ContactService, private _MODAL_SERVICE: BsModalService) { }

  contacts: any;
  isFiltered = false;
  filtering: any;

  ngOnInit() {
    this.getData();
    this.contactService.filteringObservable.subscribe(res => {
      this.isFiltered = res.isFiltered;
      this.filtering = res;
    })
  }

  getData(){
    this.contactService.retrieveContactsAndFormatData().subscribe(res => {
      this.contacts = res;
      console.log(this.contacts);
    });
  
    }
  openUpdateModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }
  openDeleteModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef = null;
  }
  openContactCard(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }
  createOrUpdateContact() {
    this.modalRef.hide();
  }

  isEmpty(object){
    return Object.keys(object).length === 0;
  }

  deleteContact(id){
    this.contactService.deleteContactById(id).subscribe(res => {
      this.getData(); 
      console.log(res);
    });
    this.modalRef2.hide();
  }

}