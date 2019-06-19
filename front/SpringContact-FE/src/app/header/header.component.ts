import { Component, OnInit, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { ContactService } from '../services/contact.service';
import { ContactModel } from '../contact/models/contact.model';
import { GroupModel } from '../contact/models/group.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  contactModel = new ContactModel();
  groupModel : GroupModel = new GroupModel();
  modalSup: BsModalRef;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  modalRef5: BsModalRef;
  data;
  filtered;

  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit(){
    this.retrieveData();
  }

  retrieveData(){
    this.contactService.getContacts().subscribe(res => {
      this.data = res;
      this.filtered = res.contacts;
    });
  }

  searchContacts(query){
    if(query.target.id === 'searchbar global-search')
      this.contactService.filterContacts(query.target.value, true);
    else   
      this.filtered = this.contactService.filterContacts(query.target.value, false);
  }

  compare(){
    if(!this.groupModel.contacts)
      this.groupModel.contacts = [];

    return this.filtered.filter(x => {
      for(let contact of this.groupModel.contacts){
        if(x.id === contact.id)
          return false;
      }
      return true;
    })
  }
  
  selectContact(contact){
    if(!this.groupModel.contacts)
      this.groupModel.contacts = [];
    
    this.groupModel.contacts.push(contact);
  }
  
  deselectContact(contact){
    this.groupModel.contacts = this.groupModel.contacts.filter(x => x.id !== contact.id);
  }
  
  addContact(template: TemplateRef<any>) {
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }
  
  createContact(body){
    this.contactService.createContact(body).subscribe(res => console.log('contact added with success !'));
    this.modalSup.hide();
  }
    
  createGroup(body){
    this.contactService.createGroup(body).subscribe(res => console.log('group created with success !'));
      this.groupModel.contacts = [];
      this.modalRef2.hide();
  }

  updateGroup(id, body){
    body.contacts = this.groupModel.contacts;
    this.contactService.updateGroup(id, body).subscribe(res => console.log('group updated with success !'))
    this.modalRef4.hide();
  }
    
  createContactModal(template: TemplateRef<any>) {
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }
  
  openDisplayGroupModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
  }
  
  displayContactsGroupCard(template: TemplateRef<any>) {
    this.modalRef3 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef= null;
  }
  
  openNewGroupModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this._MODAL_SERVICE.onHide.subscribe(res => {
      if(res === 'backdrop-click')
        this.groupModel.contacts = [];
    })
    this.modalRef = null;
  }
  
  openUpdateGroupModal(template: TemplateRef<any>, contacts) {
    this.groupModel.contacts = [...contacts];
    this.modalRef4 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
  }

  openDeleteGroupModal(template: TemplateRef<any>) {
    this.modalRef5 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef4.hide();
    this.modalRef4 = null;
  }

  deleteGroup(id) {
    this.contactService.deleteGroupById(id).subscribe(
      res => console.log('group with id ' + id + ' deleted with success !', res),
      err => console.log('an error occured while deleting group with id ' + id, err))
    this.modalRef5.hide();
  }
  
  deleteContactOnGroup(groupId, contactId) {
    this.contactService.deleteContactOnGroup(groupId, contactId);
  }
  
}