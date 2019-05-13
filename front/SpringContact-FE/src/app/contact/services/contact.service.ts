import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  url = '/assets/mocks/db.json';
  

  retrieveContactsAndFormatData(){
    return this.httpClient.get(this.url).pipe(map(res => this.filterContacts(res)));
}
  
  filterContacts(data){
    let results = {}; 
    
    for(let contact of data.contacts){
      const letter = contact.lastName.charAt(0);
      
      if(!results[letter])
        results[letter] = [];
      
        results[letter].push(contact);    
    }
    
    return results;
  
  }

}