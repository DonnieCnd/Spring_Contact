import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactListComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
