package com.webApp.Utopia.model;

/*
 * @author Jeff
 * @date 6/26/21 9:39 PM
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "channel")
public class Channel {
    @Id
    private UUID id;
    @NotNull(message = "channel name cannot be empty")
    private String name;
    @NotNull(message = "creator cannot be empty")
    private String creator;

}
