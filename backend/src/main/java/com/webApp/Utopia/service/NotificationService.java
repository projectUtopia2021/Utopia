package com.webApp.Utopia.service;

import com.webApp.Utopia.model.Notification;
import com.webApp.Utopia.model.User;
import com.webApp.Utopia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
 * @author Jeff
 * @date 8/6/21 6:44 PM
 */
@Service
public class NotificationService {
    private final UserService userService;
    private final UserRepository userRepository;
    @Autowired
    public NotificationService(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public List<Notification> getAllNotifications(String username) {
        Optional<User> optionalUser = userRepository.findByName(username);
        if (optionalUser.isEmpty()) {
            return new ArrayList<>();
        }
        return optionalUser.get().getNotifications();
    }

    public List<Notification> getAllUnreadNotifications(String username) {
        Optional<User> optionalUser = userRepository.findByName(username);
        if (optionalUser.isEmpty()) {
            return new ArrayList<>();
        }
        return optionalUser.get().getNotifications().stream().filter(notification -> notification.isUnread() == true).collect(Collectors.toList());
    }

    public void addMessage(String username, Notification notification) {
        Optional<User> optionalUser = userRepository.findByName(username);
        if (optionalUser.isEmpty()) {
            return;
        }
        List<Notification> notifications = optionalUser.get().getNotifications();
        notifications.add(notification);
        User user = optionalUser.get();
        user.setNotifications(notifications);
        userRepository.save(user);
    }

    public void markNotificationAsRead(String username, String notificationId) {
        Optional<User> optionalUser = userRepository.findByName(username);
        if (optionalUser.isEmpty()) {
            return;
        }
        List<Notification> notifications = optionalUser.get().getNotifications();
        notifications.stream().forEach(notification -> {
            if (notification.getId().equals(notificationId)) {
                notification.setUnread(true);
            }
        });
    }

}
