package com.hk.lakesidehotel.dto.response;

import com.hk.lakesidehotel.model.Role;

import java.util.Collection;

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Collection<Role> roles;

    public UserDto() {
    }

    public UserDto(Long id, String firstName, String lastName, String email, Collection<Role> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
