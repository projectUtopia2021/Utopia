package com.webApp.Utopia.model;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * @author Jeff
 * @date 7/4/21 1:58 AM
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommunityNameObject {
    private String communityName;
}
