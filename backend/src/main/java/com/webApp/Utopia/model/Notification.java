package com.webApp.Utopia.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

/*
 * @author Jeff
 * @date 8/6/21 6:39 PM
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Notification {
    @Id
    private String id;
    private String sender;
    private String postId;
    private boolean unread;
}
