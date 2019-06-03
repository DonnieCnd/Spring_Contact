import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule, BsModalRef, ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactListComponent,
    AutofocusDirective,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    HttpClientModule,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
