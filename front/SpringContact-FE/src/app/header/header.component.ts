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
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  selectedContacts = [];
  contacts: any;
  matchingContacts = [];
  isFiltered: boolean = false;
  searchTerm: string;
  groupName: string;
  res;
  groups;

  constructor(private _MODAL_SERVICE: BsModalService, private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSubjectObservable.subscribe(res => {
      this.res = res;
      console.log(this.res)
      // this.contactService.setData(this.res)
    })
    this.getData();
    this.contactService.getGroups().subscribe(res => {
      this.groups = res;
      this.groups = this.groups.groups
      console.log(this.groups)
    })
  }

  getData(){
    this.contactService.getData().subscribe(res => {
      this.contacts = res;
      this.contacts = this.contacts.map(x => { return { ...x, selected: false }})  
    });
  }

  addContact(template: TemplateRef<any>) {
    this.modalSup = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-success'}));
  }


  filter(value){
    this.contactService.setFiltering(value);
  }

  createContact(body){
    this.contactService.createContact(body).subscribe(res => {
      // console.log('success', res);
      this.contactService.notifyContactListComponent(true);
      this.getData();
    },
    (error) => {
      console.log('an error occured during post request', error);
    })
    this.modalSup.hide();  
  }

  displayContactsGroupCard(template: TemplateRef<any>) {
    this.modalRef3 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef= null;
  }
  
  openDisplayGroupModal(template: TemplateRef<any>) {
    this.modalRef = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.matchingContacts = [];
    this.selectedContacts = [];
    this.groupName = '';
    this.searchTerm = '';
  }

  openUpdateGroupModal(template: TemplateRef<any>) {
    this.modalRef4 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef= null;
  }
  
  openNewGroupModal(template: TemplateRef<any>) {
    this.modalRef2 = this._MODAL_SERVICE.show(template, Object.assign({}, {class: 'modal-lg modal-primary'}));
    this.modalRef.hide();
    this.modalRef = null;
  }

  displayMatchingContacts(value) {
    if(value != ''){ 
      this.matchingContacts = this.contacts.filter(x => {
        if(!x.selected){
          if(x.lastName){ // contact lastName is not mandatory, avoid error when lastName is not filled
            return x.firstName.substring(0, value.length).toLowerCase() === value.toLowerCase() || x.lastName.substring(0, value.length).toLowerCase() === value.toLowerCase();
          }
        }
      })
    this.isFiltered = true;
    }  
    else{
      this.isFiltered = false;
    } 
  }

  updateMatchingContacts(value, array){
    let filtered = this.compare(array.contacts)
    if(value != ''){
      this.matchingContacts = filtered.filter(x => {
        if(!x.selected){
          if(x.lastName){ // contact lastName is not mandatory, avoid error when lastName is not filled
            return x.firstName.substring(0, value.length).toLowerCase() === value.toLowerCase() || x.lastName.substring(0, value.length).toLowerCase() === value.toLowerCase();
          }
        }
      })
      this.isFiltered = true;  
    }
    else {
      this.isFiltered = false;
    }
  }

  compare(array) {
    let result = [];
    for (let i = 0; i< this.contacts.length; i++) {
      let index = -1;
      let compare = this.contacts[i].id;
      for (let j = 0; j < array.length; j++) {
        if (compare == array[j].id) {
          index = 1;
        }
      }
      if (index == -1) {
        result.push(this.contacts[i])
      }
    }
    return result;
  }

  resetSearchField(){
    this.searchTerm = '';
    this.isFiltered = false;
    this.matchingContacts = [];
  }

  log(item){
    this.searchTerm = '';
    this.isFiltered = false;
    this.selectedContacts.push(item);
    this.setSelected(item.id)
    this.sortContactsByLastName();
  }

  sortContactsByLastName(){
    this.selectedContacts = this.selectedContacts.sort((a,b) => {
      if(a.lastName.toLowerCase() < b.lastName.toLowerCase()){
        return -1;
      }
      if(a.lastName.toLowerCase() > b.lastName.toLowerCase()){
        return 1;
      }
    })
  }

  deleteSelectedContact(id){
    this.selectedContacts = this.selectedContacts.filter(x => x.id !== id);
    this.setSelected(id);
  }

  setSelected(id){
    return this.matchingContacts = this.contacts.filter(x => {
      if(x.id === id){
       return x.selected = !x.selected;
      }
    })
  }

}