import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  url: string = "assets/mocks/myJSONfile.json";
  data: any;
  contacts = {};

  ngOnInit() {
    this.httpClient.get(this.url).subscribe(result => {
      this.data = result;
      this.data = this.data.contacts;
      this.filterContacts(this.data);
    })
  }

  filterContacts(data){
    for(let contact of data){

      const letter = contact.lastName.charAt(0);
     
      if(!this.contacts[letter])
        this.contacts[letter] = [];
     
      this.contacts[letter].push(contact);
    }
  }
}
