package com.webApp.Utopia.service;

import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*
 * @author Jeff
 * @date 6/29/21 7:57 PM
 */
@Service
public class CommunityService {
    @Autowired
    CommunityRepository communityRepo;

    public List<Community> getAllCommunities() {
        return communityRepo.findAll();
    }

    public Community getCommunityByName(String name) {
        Optional<Community> targetCommunity= communityRepo.findByName(name);

        //need to create an Exception class to handle the not found error
        if (!targetCommunity.isPresent()) {
            return null;
        } else {
            return targetCommunity.get();
        }
    }

    public boolean createCommunity(Community newCommunity) {
        Optional<Community> communityByName = communityRepo.findByName(newCommunity.getName());
        // need to create an Exception class to handle the exiting error
        if (communityByName.isPresent()) {
            return false;
        } else {
            communityRepo.save(newCommunity);
            return true;
        }
    }

    public boolean updateCommunity(Community updatedCommunity) {
        Optional<Community> communityByName = communityRepo.findByName(updatedCommunity.getName());
        // need to create an Exception class to handle the exiting error
        if (!communityByName.isPresent()) {
            return false;
        } else {
            communityRepo.save(updatedCommunity);
            return true;
        }
    }
}
