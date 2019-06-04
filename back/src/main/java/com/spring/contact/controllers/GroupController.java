package com.spring.contact.controllers;

import com.spring.contact.entities.GroupEntity;
import com.spring.contact.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin

public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/groups")
    public List<GroupEntity> getGroups(){
        return groupService.retrieveAllGroups();
    }

    @GetMapping("/groups/{id}")
    public Optional<GroupEntity> getGroupById(@PathVariable Long id){
        return groupService.retrieveOneGroupById(id);
    }

    @PostMapping("/groups")
    public List<GroupEntity> saveGroup(@RequestBody GroupEntity groupEntity){
        groupService.saveGroup(groupEntity);
        return groupService.retrieveAllGroups();
    }

    @PutMapping("/groups/{id}")
    public List<GroupEntity> updateGroup(@RequestBody GroupEntity groupEntity, @PathVariable Long id ){
        groupService.updateGroup(groupEntity, id);
        return groupService.retrieveAllGroups();
    }

    @DeleteMapping("/groups/{id}")
    public void deleteGroup(@PathVariable Long id){
        groupService.deleteGroup(id);
    }

    @DeleteMapping("/groups/{groupId}/contacts/{contactId}")
    public List<GroupEntity> deleteContactGroup(@PathVariable Long groupId, @PathVariable Long contactId) {
        groupService.deleteContactGroup(groupId, contactId);
        return groupService.retrieveAllGroups();
    }

}