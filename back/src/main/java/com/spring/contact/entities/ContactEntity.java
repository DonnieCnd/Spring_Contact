package com.spring.contact.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Getter
@Setter
public class ContactEntity {
    @Id
    @Column(name="CONTACT_ID")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    @ManyToMany(mappedBy = "contacts")
    @JsonIgnore
    private List<GroupEntity> groups;

}