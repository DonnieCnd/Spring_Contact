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

  filtering: BehaviorSubject<any> = new BehaviorSubject<any>({isFiltered: false, value : ""});
  filteringObservable = this.filtering.asObservable();
  notify: BehaviorSubject<any> = new BehaviorSubject<any>({ update: false })
  notifyObservable = this.notify.asObservable();
  data;

  retrieveContactsAndFormatData(){
    return this.httpClient.get(this.serverUrl).pipe(map(res => {
      this.data = res;
      return this.formatData(res);
  }));
}


  getData(){
    return this.httpClient.get(this.serverUrl)
  }
  
  formatData(data){
    let results = {}; 
    
    for(let contact of data){
      
      if(contact.lastName){
        const letter = contact.lastName.charAt(0).toUpperCase();

      if(!results[letter])
        results[letter] = [];
      
      results[letter].push(contact);    
    }
  }
    return results;
  }

  setFiltering(value){
    // value.length > 0 ? this.filtering.next({"isFiltered": true, "value": value}) : this.filtering.next({"isFiltered": false, "value": ""})
    if(value.length > 0){
      let filtered = this.data.filter(x => x.firstName.toLowerCase().includes(value.toLowerCase()) || x.lastName.toLowerCase().includes(value.toLowerCase()));
      let data = this.formatData(filtered);
      this.filtering.next({ isFiltered: true, value: value, data: data });
    }
    else{
      this.filtering.next({isFiltered: false});
    }
  } 
  
  createContact(body: ContactModel){
    return this.httpClient.post(this.serverUrl, body);

  }
  
  deleteContactById(id){
    return this.httpClient.delete(this.serverUrl + '/' + id);
  }

  updateContact(id, body){
    return this.httpClient.put((this.serverUrl + '/' + id), body);
  }

  notifyContactListComponent(value: boolean){
    this.notify.next({ updated: value });
  }

}