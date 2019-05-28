package com.spring.contact.services;


import com.spring.contact.entities.ContactEntity;
import com.spring.contact.entities.GroupEntity;
import com.spring.contact.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.acl.Group;
import java.util.List;
import java.util.Optional;

@Service

public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public List<GroupEntity> retrieveAllGroups(){
        return groupRepository.findAll();
    }

    public Optional<GroupEntity> retrieveOneGroupById(Long id){
        return groupRepository.findById(id);
    }

    public void saveGroup(GroupEntity groupEntity){
        groupRepository.save(groupEntity);
    }

    public List<GroupEntity> deleteGroup(Long id){
        groupRepository.deleteById(id);
        return groupRepository.findAll();
    }

    public void updateGroup(GroupEntity groupEntity, Long id){
        Optional<GroupEntity> optionalGroupEntity = groupRepository.findById(id);
        if(optionalGroupEntity.isPresent()){
            groupRepository.save(groupEntity);
        }
    }
}