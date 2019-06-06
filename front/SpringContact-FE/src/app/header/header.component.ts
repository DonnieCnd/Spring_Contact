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
  groupModel : GroupModel = new GroupModel();
  contacts = new GroupModel().contacts = []; 
  modalSup: BsModalRef;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  modalRef5: BsModalRef;
  data: any;
  filtered: any;


  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit(){
    this.retrieveData();
  }

  retrieveData(){
    this.contactService.getContacts().subscribe(res => this.data = res);
  }

  // isEmpty(obj){
  //   return Object.keys(obj).length === 0;
  // }
  
  // searchContacts(event){
  //   if(event.target.id === 'searchbar ng-contact-search'){
  //     let results = this.contactService.filterContacts(event);
  //     this.data = { ...this.data, contacts: results };  
  //   } else{
  //       this.contactService.filterContacts(event);
  //     }
  // }


  searchContacts(event){
    if(event.target.id === 'searchbar ng-contact-search'){
      if(event.target.value.length > 0)
        this.filtered = this.contactService.filterContacts(event.target.value);
      else
        this.filtered = this.data.contacts;
    }
  }

  compare(){
    if(!this.filtered || !this.groupModel.contacts){
      return this.data.contacts;
    }
    
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
    this.groupModel.contacts.push(contact);console.log(this.groupModel.contacts);
  }
  
  deselectContact(contact){
    this.groupModel.contacts = this.groupModel.contacts.filter(x => x.id !== contact.id);
  }

  resetSearchField(){
    this.filtered = this.data.contacts;
  }
  
  addContact(template: TemplateRef<any>) {
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }
  
  createContact(body){
    this.contactService.createContact(body).subscribe(res => console.log("contact created with success !", res))
    this.modalSup.hide();
  }

  updateContact(id, body){
    this.contactService.updateContact(id, body).subscribe(res => console.log(res));
  }
    
  createGroup(body){
    console.log(this.groupModel)
    this.contactService.createGroup(body).subscribe(res => {
      console.log("group added with success", res);
      this.groupModel.contacts = [];
      this.modalRef2.hide();
    })
  }

    updateGroup(id, body){
      body.contacts = this.groupModel.contacts;
      console.log(body)
      this.contactService.updateGroup(id, body).subscribe(res => {
        console.log("ok",res),
        (err) => {
          console.log("error", err)
        }
      })     
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
      this.modalRef = null;
    }
    
    openUpdateGroupModal(template: TemplateRef<any>, contacts) {
      this.groupModel.contacts = [...contacts];
      console.log(this.groupModel.contacts);
      this.modalRef4 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
      this.modalRef.hide();
    }
    
    deleteContactOnGroup (groupId, contactId) {
      this.contactService.deleteContactOnGroup(groupId, contactId);
    }
    
  }


  // impl :

  // getMatchingContacts(){
  //   return this.data.contacts.filter(x => !x.selected); 
  // }
    
  // toggleSelect(contact){
  //   contact.selected = true;
  //   this.selectContact(contact);
    
  //   if(this.getMatchingContacts().length === 0)
  //     this.data = {...this.data, contacts: this.contactService.filterContacts({ target: { id: 'searchbar ng-contact-search', value: ''}})};
    
  // }
  
  // selectContact(contact){
  //   if(!this.groupModel.contacts)
  //   this.groupModel.contacts = [];
  //   this.groupModel.contacts.push(contact);
  // }
  
  // deselectContact(contact){
  //   contact.selected = false;
  //   this.groupModel.contacts = this.groupModel.contacts.filter(x => x.id !== contact.id);
  // }





      //   compare(array){
      //     let res = [];
      
      //     for(let i = 0; i < contacts.length; i++){
      //         let index = -1;
      //         let element = contacts[i].id
      //         for(let j = 0; j < array.length; j++){
      //             if(array[j].id === element){
      //                 index = 1;
      //             }
      //         }
      //         if(index === -1){
      //             res.push(contacts[i]);
      //         }
      //     }
      //     console.log(res)
      // }
      
        // compareAndGetMatchingContacts(group){
        //   let results = [];
        //   let unavailable = group.contacts.map(x => x.id);
        //   results = this.data.contacts.filter(x => x.i)
        //   console.log(unavailable);
        //   // results = this.data.contacts.filter(x => {
        //   //   for(let contact of group.contacts){
        //   //     if(x.id === contact.id)
        //   //       return false;
        //   //   }
        //   //   return true;
        //   // })
        //   // return results;
        // }
        
        
      
      
        // [ 3, 4]
        // [ 1 2 3 4 5 6 7 8 9 10]