import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';
import { ContactService } from '../contact/services/contact.service';
import { ContactModel } from '../contact/models/contact.model';
import { GroupModel } from '../contact/models/group.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  contactForm = NgForm;
  contactModel = new ContactModel();
  groupModel = new GroupModel();
  modalSup: BsModalRef;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  
  contacts: ContactModel[] = []; 
  matchingContacts = [];
  name: string;
  searchTerm: string;
  data;


  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit(){
    this.contactService.getContacts().subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }

  searchContacts(event){
    if(event.target.id === "searchbar ng-contact-search")
      this.matchingContacts = this.contactService.filterContacts(event);
    else
      this.contactService.filterContacts(event);
  }

  select(contact: ContactModel){
    if(!this.groupModel.contacts)
      this.groupModel.contacts = [];
      // this.setSelection(contact.id);
    this.groupModel.contacts.push(contact);
  }

  deleteSelectedContact(id){
    this.setSelection(id);
    this.groupModel.contacts = this.groupModel.contacts.filter(x => x.id !== id);
  }

  setSelection(id){

  }

  // setSelection(id){
  //   this.data = this.data.filter(x => {
  //     if(x.id === id){
  //       x.selected = !x.selected;
  //     }
  //     return true;
  //   })
  // }

  createGroup(body){
    this.contactService.createGroup(body).subscribe(res => console.log(res));
  }

  trackByIndex(index: number, item) {
    return index;
  }

  // select(contact){
  //   console.log(this.data) 
  //   this.data = this.data.filter(x => {
  //     if(x.id === contact.id){
  //       x.selected= !x.selected;
  //     }
  //     return x;
  //   })
  //   console.log(this.data);   
  // }


  // getMatchingContacts(value){
  //     this.matchingContacts = this.matchingContacts.filter(x => {
  //       if(!x.selected){
  //         if(x.lastName){
  //           return x.firstName.substring(0, value.length).toLowerCase() === value.toLowerCase() || x.lastName.substring(0, value.length).toLowerCase() === value.toLowerCase();
  //         }
  //       }
  //     }) 
  //   }


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

    // this.modalSup.hide();
  }
  
  openDisplayGroupModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.contacts = [];
    console.log(this.contacts)
  }
  
  openNewGroupModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef = null;
  }

}

  // displayMatchingContacts(value){
  //   if(value.length > 0){
  //     this.getMatchingContacts(value);
  //     console.log(this.matchingContacts);
  //   }
  // }

  // log(item){
  //   this.selectedContacts.push(item);
  //   this.setSelected(item.id)
  //   this.sortContactsByLastName();
  //   console.log(this.matchingContacts)
  // }

  // sortContactsByLastName(){
  //   this.selectedContacts = this.selectedContacts.sort((a,b) => {
  //     if(a.lastName.toLowerCase() < b.lastName.toLowerCase()){
  //       return -1;
  //     }
  //     if(a.lastName.toLowerCase() > b.lastName.toLowerCase()){
  //       return 1;
  //     }
  //   })
  // }

  // deleteSelectedContact(id){
  //   this.selectedContacts = this.selectedContacts.filter(x => x.id !== id);
  //   this.setSelected(id);
  // }

  // setSelected(id){
  //    this.contacts = this.contacts.filter(x => {
  //     if(x.id === id){
  //      return x.selected = !x.selected;
  //     }
  //   })
  //   console.log(this.contacts);
  // }

   // resetSearchField(){
  //   this.searchTerm = '';
  // }
