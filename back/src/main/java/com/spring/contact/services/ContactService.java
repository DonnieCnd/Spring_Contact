package com.spring.contact.services;


import com.spring.contact.entities.ContactEntity;
import com.spring.contact.entities.GroupEntity;
import com.spring.contact.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ContactRepository contactRepository;


    public List<ContactEntity> retrieveAllContacts(){
        return contactRepository.findAll();
    }

    public Optional<ContactEntity> retrieveOneContact(Long id){
        return contactRepository.findById(id);
    }

    public void saveContact(ContactEntity contactEntity){
        contactRepository.save(contactEntity);
    }

    public void updateContact(ContactEntity contactEntity, Long id) {
        Optional<ContactEntity> optionalContactEntity = contactRepository.findById(id);
        if (optionalContactEntity.isPresent()){
            contactRepository.save(contactEntity);
        }
    }

    @Transactional
    public void deleteContact(Long id){
        ContactEntity contact = entityManager.find(ContactEntity.class, id);
        for(GroupEntity group: contact.getGroups()){
            if(group.getContacts().size() == 1){
                entityManager.remove(group);
            } else{
              group.getContacts().remove(contact);
            }
        }
        entityManager.remove(contact);
    }

}