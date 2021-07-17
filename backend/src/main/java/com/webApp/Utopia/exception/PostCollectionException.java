package com.webApp.Utopia.exception;

public class PostCollectionException extends Exception {

    public PostCollectionException(String message)
    {
        super(message);
    }

    public static String NotFoundException(String id)
    {
        return "Post with "+id+" not found";
    }

    public static String TitleAlreadyExists()
    {
        return "Post with given title already exists";
    }

    public static String PropertyMissing(String propertyName) {return propertyName + " cannot be empty"; }
}
