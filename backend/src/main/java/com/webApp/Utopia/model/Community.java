package com.webApp.Utopia.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

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
    @NotNull(message = "community name cannot be empty")
    private String name;
    @NotNull(message = "description cannot be empty")
    private String description;
    @NotNull(message = "creator username cannot be empty")
    private String username;
    private List<String> members;
    private List<String> posts;

}
