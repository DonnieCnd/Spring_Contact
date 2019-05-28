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
  dataSource;

  ngOnInit() {
    this.getData();

    this.contactService.contactSubjectObservable.subscribe(res => {
      res.update === true ? this.getData() : '';
      this.isFiltered = res.isFiltered;
      this.dataSource = res;
    })
  }

  getData(){
    this.contactService.retrieveContactsAndFormatData().subscribe(res => {
      this.contacts = res;
    });
  
  }

  isEmpty(object){
    if(!object){
      return false;
    }
    return Object.keys(object).length === 0;
  }


  // Modals

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



  // CRUD

  deleteContact(id){
    this.contactService.deleteContactById(id).subscribe(res => {
      this.getData(); 
    });
    this.modalRef2.hide();
  }
  
  updateContact(id, body) {
    this.contactService.updateContact(id, body).subscribe(res => this.modalRef.hide());
  }

}