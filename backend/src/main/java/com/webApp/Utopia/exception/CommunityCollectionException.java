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
        return "Community " + name + " is not found";
    }

    public static String CommunityNameExists(String name) {
        return name + " already exists";
    }

    public static String CommunityCreatorNameDoesNotMatch(String name) {return name + " is not authorized"; }

    public static String PropertyMissing(String property) { return property + " cannot be empty"; }
}
