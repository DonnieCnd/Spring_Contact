package com.spring.contact.controllers;

import com.spring.contact.entities.ContactEntity;
import com.spring.contact.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/contacts")
    public List<ContactEntity> getAll(){
        return contactService.retrieveAllContacts();
    }

    @GetMapping("/contacts/{id}")
    public Optional<ContactEntity> getOne(@PathVariable Long id){
        return contactService.retrieveOneContact(id);
    }

    @PostMapping("/contacts")
    public List<ContactEntity> save(@RequestBody ContactEntity contactEntity){
        contactService.saveContact(contactEntity);
        return contactService.retrieveAllContacts();
    }

    @PutMapping("/contacts/{id}")
    public List<ContactEntity> update(@RequestBody ContactEntity contactEntity, @PathVariable Long id){
        contactService.updateContact(contactEntity, id);
        return contactService.retrieveAllContacts();
    }

    @DeleteMapping("/contacts/{id}")
    public List<ContactEntity> delete(@PathVariable Long id){
        contactService.deleteContact(id);
        return contactService.retrieveAllContacts();
    }

}
