import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  contacts: any;

  ngOnInit() {
    this.httpClient.get('http://localhost:8081/contacts').subscribe(result => console.log(result));
  }

}
