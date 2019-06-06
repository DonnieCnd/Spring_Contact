import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ContactModel } from '../models/contact.model';
import { GroupModel } from '../models/group.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  serverUrl = 'http://localhost:8081/';

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private data: any;

  setData(data){
    this.dataSubject.next(data);
    this.data = data;
  }

  getContacts(){
    if(this.dataSubject.getValue().length === 0)
      this.fetchAPI();
    
    return this.dataSubject.asObservable();
  }

  // getGroups() {
  //   return this.httpClient.get(this.serverUrl + 'groups');
  // }

  // getData(){
  //   return this.httpClient.get(this.serverUrl + 'contacts');
  // };
  
  fetchAPI(){
    let getContacts = this.httpClient.get(this.serverUrl + '/contacts').toPromise();
    let getGroups = this.httpClient.get(this.serverUrl + '/groups').toPromise();
    
    Promise.all([getContacts, getGroups]).then(res => {
      this.data = { contacts: res[0], groups: res[1] };
      this.setData(this.data);
    });
  }

  formatData(data){
    let results = [];
    for(let contact of data.contacts){  
      
      let letter;    
      contact.lastName ? letter = contact.lastName.charAt(0).toUpperCase() : letter = contact.firstName.charAt(0).toUpperCase();
      
      if(!results[letter])
        results[letter] = [];
      
      results[letter].push(contact);    
    
    }
    return results;
  }
  
  filterContacts(query){
    return this.data.contacts.filter(x => { 
      return x.lastName ? x.lastName.toLowerCase().includes(query.toLowerCase()) || 
      x.firstName.toLowerCase().includes(query.toLowerCase()) : x.firstName.toLowerCase().includes(query.toLowerCase());
    })
    // this.dataSubject.next({ ...this.dataSubject.value, contacts: results });
  }
  
  createContact(body: ContactModel){
    return this.httpClient.post(this.serverUrl + '/contacts/', body).pipe(tap(res => this.setData({...this.dataSubject.value, contacts: res })));
  }
  
  deleteContactById(id){
    return this.httpClient.delete(this.serverUrl + '/contacts/' + id).pipe(tap(res => this.setData({...this.dataSubject.value, contacts: res })))
  }

  updateContact(id, body: ContactModel){
    return this.httpClient.put((this.serverUrl + '/contacts/' + id), body).pipe(tap(res => this.setData({...this.dataSubject.value, contacts: res })))
  }

  createGroup(body){
    return this.httpClient.post(this.serverUrl + '/groups/', body).pipe(tap(res => this.setData({...this.dataSubject.value, groups: res })));
  }

  deleteGroupById(id){
    return this.httpClient.delete(this.serverUrl + 'groups/' + id).pipe(tap(res => this.setData({...this.dataSubject.value, groups: res })));
  }

  updateGroup(id, body:GroupModel){
    return this.httpClient.put((this.serverUrl + 'groups/' + id), body).pipe(tap(res => this.setData({...this.dataSubject.value, groups: res })));
  }

  deleteContactOnGroup(groupId, contactId){
    return this.httpClient.delete(this.serverUrl + 'groups/' + groupId + '/contacts/' + contactId).pipe(tap(res => this.setData({...this.dataSubject.value, groups: res })));
  }

}