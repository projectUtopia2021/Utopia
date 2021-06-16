package com.webApp.Utopia.model;


import com.webApp.Utopia.utils.UserRole;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="user")
public class User implements UserDetails {

    @Id
    private String id;

    @NotNull(message = "Username cannot be empty")
    private String name;

    @NotNull(message = "emailAddress cannot be empty")
    private String email;
    @NotNull(message = "password cannot be empty")
    private String password;
    private UserRole userRole;
    private Boolean locked = false;
    private Boolean enabled =true;
    private List<String> friends;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User(@NotNull(message = "Username cannot be empty") String name, @NotNull(message = "emailAddress cannot be empty") String email, List<String> friends) {
        this.name = name;
        this.email = email;
        this.friends = friends;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String emailAddress) {
        this.email = emailAddress;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("USER");
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}


