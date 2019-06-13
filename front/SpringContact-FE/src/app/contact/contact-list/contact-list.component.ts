import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ContactService } from '../services/contact.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  data: any;

  constructor(private contactService: ContactService, private _MODAL_SERVICE: BsModalService) { }

  ngOnInit() {
    this.retrieveData();
  }

  retrieveData(){
    this.contactService.getContacts().subscribe(res => {
      if(res.contacts)
        this.data = this.contactService.formatData(res);
    })
  }

  updateContact(id, body){
    this.contactService.updateContact(id, body).subscribe(res => console.log('contact with id: ' + id + 'updated with success !'));
    this.modalRef.hide();
  }

  deleteContact(id){
    this.contactService.deleteContactById(id).subscribe(res => console.log('contact with id: ' + id + 'deleted with success !'));
    this.modalRef2.hide();
  }
  
  openContactCard(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }
  
  openUpdateModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }

  openDeleteModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef = null;
  }

  createOrUpdateContact() {
    this.modalRef.hide();
  }
  
}