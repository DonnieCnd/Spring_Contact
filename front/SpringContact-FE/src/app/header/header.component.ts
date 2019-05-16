import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';
import { ContactService } from '../contact/services/contact.service';
import { ContactModel } from '../contact/models/contact.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('contactForm')

  contactForm = NgForm;
  contactModel = new ContactModel();
  modalSup: BsModalRef;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  selected: any;
  contacts: any;
  matchingContacts;
  isFiltered: boolean = false;

  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getData().subscribe(res => {
      this.contacts = res;
      console.log(this.contacts);
    });
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

  createContact(body){
    this.contactService.createContact(body).subscribe(res => {
      console.log('success', res);
      this.contactService.notifyContactListComponent(true);
    },
    (error) => {
      console.log('an error occured during post request', error);
    })
    this.modalSup.hide();
    
  }
  openDisplayGroupModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }
  openNewGroupModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef = null;
  }

  displayMatchingContacts(value){
    if(value != ''){ 
      this.matchingContacts = this.contacts.filter(x => {
        if(x.lastName){ // contact lastName is not mandatory, avoid error when lastName is not filled
          return x.firstName.substring(0, value.length).toLowerCase() === value.toLowerCase() || x.lastName.substring(0, value.length).toLowerCase() === value.toLowerCase();
        }
      })
      this.isFiltered = true;
    }  
    else{
      this.isFiltered = false;
    }
  }

  resetSearchField(){
    this.isFiltered = false;
    this.matchingContacts = [];
  }

}