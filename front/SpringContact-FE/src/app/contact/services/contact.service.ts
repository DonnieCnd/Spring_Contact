import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  url = '/assets/mocks/db.json';
  filtering: BehaviorSubject<any> = new BehaviorSubject<any>({isFiltered: false, value : ""});
  filteringObservable = this.filtering.asObservable();
  data;

  retrieveContactsAndFormatData(){
    return this.httpClient.get(this.url).pipe(map(res => {
      this.data = res
      return this.formatData(res.contacts);
  }));
}
  
  formatData(data){
    
    let results = {}; 
    
    for(let contact of data){
      const letter = contact.lastName.charAt(0);
      
      if(!results[letter])
        results[letter] = [];
      
      results[letter].push(contact);    
    }
    
    return results;
  }

  setFiltering(value){
    // value.length > 0 ? this.filtering.next({"isFiltered": true, "value": value}) : this.filtering.next({"isFiltered": false, "value": ""})
    if(value.length > 0){  
      let data = this.formatData(this.data.contacts.filter(x => x.firstName.toLowerCase().includes(value.toLowerCase()) || x.lastName.toLowerCase().includes(value.toLowerCase())))
      this.filtering.next({isFiltered: true, value: value, data: data});
    }
    else{
      this.filtering.next({isFiltered: false})
    }
  }  
}