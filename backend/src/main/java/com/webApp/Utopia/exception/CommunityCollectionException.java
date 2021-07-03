package com.webApp.Utopia.exception;

/*
 * @author Jeff
 * @date 7/1/21 3:53 PM
 */
public class CommunityCollectionException extends Exception{
    public CommunityCollectionException(String message) {
        super(message);
    }

    public static String NotFoundException(String name) {
        return "Community with id " + name + " is not found";
    }

    public static String CommunityNameExists(String name) {
        return name + " already exists";
    }
}
