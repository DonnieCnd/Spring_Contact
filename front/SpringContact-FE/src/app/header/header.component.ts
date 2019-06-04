import { Component, OnInit, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { ContactService } from '../contact/services/contact.service';
import { ContactModel } from '../contact/models/contact.model';
import { GroupModel } from '../contact/models/group.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  contactModel = new ContactModel();
  groupModel = new GroupModel();
  modalSup: BsModalRef;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  modalRef5: BsModalRef;
  data: any;


  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit(){
    this.retrieveData();
  }

  retrieveData(){
    this.contactService.getContacts().subscribe(res => {
      if(Object.keys(res).length !== 0){
        this.data = res;
        this.data.contacts = this.data.contacts.map(x => { return { ...x, selected: false }})
      }
    })
  }
  
  searchContacts(event){
    if(event.target.id === 'searchbar ng-contact-search'){
      let results = this.contactService.filterContacts(event);
      this.data = { ...this.data, contacts: results };
      console.log(this.data.contacts);  
    } else {
        this.contactService.filterContacts(event);
      }
  }
  
  getMatchingContacts(){
    return this.data.contacts.filter(x => !x.selected);
  }
  
  toggleSelect(contact){
    contact.selected = true;
    this.selectContact(contact);
    
    if(this.getMatchingContacts().length === 0){
      this.data = {...this.data, contacts: this.contactService.filterContacts({ target: { id: 'searchbar ng-contact-search', value: ''}})};
    }

  } 
  
  selectContact(contact){
    if(!this.groupModel.contacts)
      this.groupModel.contacts = [];
    this.groupModel.contacts.push(contact);
  }
  
  deselectContact(contact){
    contact.selected = false;
    this.groupModel.contacts = this.groupModel.contacts.filter(x => x.id !== contact.id);
  }

  addContact(template: TemplateRef<any>) {
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }

  createContact(body){
    this.contactService.createContact(body).subscribe(res => {
      console.log('contact created with success', res);
    },
    (error) => {
      console.log('an error occured during post request : ', error);
    })
    this.modalSup.hide();
  }

  createGroup(body){
    this.contactService.createGroup(body).subscribe(res => {
      console.log("group added with success");
      this.groupModel.contacts = [];
    })
  }
  
  openDisplayGroupModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }
  
  openNewGroupModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef = null;
  }

}