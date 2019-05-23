import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { ContactModel } from '../models/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  url = '/assets/mocks/db.json';
  serverUrl = 'http://localhost:8081/contacts';

  contactSubject: BehaviorSubject<any> = new BehaviorSubject<any>({ data: null, isFiltered: false, value : "", update: false });
  contactSubjectObservable = this.contactSubject.asObservable();
  data: any;
  update: boolean = false;
  groups;

  retrieveContactsAndFormatData(){
    return this.httpClient.get(this.serverUrl).pipe(map(res => {
      this.data = res;
      return this.formatData(res);
    }));
  }

  getGroups() {
    return this.httpClient.get(this.url)
  }

  getData(){
    return this.httpClient.get(this.serverUrl);
  };
  
  formatData(data){
    let results = {}; 
    
    for(let contact of data){
      let letter;
      contact.lastName ? letter = contact.lastName.charAt(0).toUpperCase() : letter = contact.firstName.charAt(0);

      if(!results[letter])
        results[letter] = [];
      
      results[letter].push({...contact, selected: false});    
    }
    console.log(results)
    return results;
  };

  setFiltering(value){
    if(value.length > 0){
      
      let filtered = this.data.filter(x => {
        return x.lastName ? x.lastName.toLowerCase().includes(value.toLowerCase()) || x.firstName.toLowerCase().includes(value.toLowerCase()) : x.firstName.toLowerCase().includes(value.toLowerCase());
      })

      let data = this.formatData(filtered);
      
      this.contactSubject.next({ data: data, isFiltered: true, value : value, update: false });
    
    }

    else{
      this.contactSubject.next({ isFiltered: false, value : value, update: false });
    }
  
  };
  
  createContact(body: ContactModel){
    return this.httpClient.post(this.serverUrl, body);
  };
  
  deleteContactById(id){
    return this.httpClient.delete(this.serverUrl + '/' + id);
  };

  updateContact(id, body: ContactModel){
    return this.httpClient.put((this.serverUrl + '/' + id), body);
  };

  notifyContactListComponent(value: boolean){
    this.update = true;
    this.contactSubject.next({...this.contactSubject.value, update: true});
    this.update = false;
  };

};
