package com.webApp.Utopia.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityIdName {
    private String communityId;
    private String communityName;
    @Override
    public boolean equals(Object targetObject) {
        if (!(targetObject instanceof CommunityIdName)) {
            return false;
        }
        CommunityIdName targetSource = (CommunityIdName) targetObject;
        return this.communityId.equals(targetSource.getCommunityId());
    }
}
