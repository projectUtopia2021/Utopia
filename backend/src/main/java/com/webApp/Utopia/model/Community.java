package com.webApp.Utopia.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

/*
 * @author Jeff
 * @date 6/26/21 9:22 PM
 */
@Document(collection = "community")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Community {
    @Id
    private String id;
    private String name;
    private String description;
    @NotNull(message = "creator username cannot be empty")
    private String username;
    private List<String> subscribers;
    private List<String> posts;
}

