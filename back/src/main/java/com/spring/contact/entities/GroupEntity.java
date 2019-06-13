package com.spring.contact.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Getter
@Setter

public class GroupEntity {

    @Id
    @Column(name="GROUP_ID")
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="CONTACT_GROUP",
            joinColumns = @JoinColumn(name="GROUP_ID"),
            inverseJoinColumns = @JoinColumn(name="CONTACT_ID"))

    private List<ContactEntity> contacts;

}