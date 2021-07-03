package com.webApp.Utopia.service;

import javax.validation.ConstraintViolationException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;

    public List<Comment> getAllComments() {
        List<Comment> comments = commentRepo.findAll();
        if (comments.size() > 0) {
            return comments;
        } else {
            return new ArrayList<Comment>();
        }
    }

    public void createComment(Comment comment)
            throws ConstraintViolationException, CommentCollectionException {

        // If the comment is valid as per not null constraint we have to next
        // check if the comment with the same name/id already exists
        Optional<Comment> commantTitleOptional = commentRepo
                .findByTitle(comment.getTitle());
        if (commantTitleOptional.isPresent()) {
            System.out.println(commantTitleOptional.get());
            throw new CommentCollectionException(
                    CommentCollectionException.TitleAlreadyExists());
        } else {
            commentRepo.save(comment);
        }

    }

    public void updateComment(String id, Comment newComment)
            throws ConstraintViolationException, CommentCollectionException {
        Optional<Comment> commentWithId = commentRepo.findById(id);
        Optional<Comment> movieWithSameTitle = commentRepo
                .findByTitle(newComment.getTitle());
        if (commentWithId.isPresent()) {
            if (movieWithSameTitle.isPresent()
                    && !movieWithSameTitle.get().getId().equals(id)) {

                throw new CommentCollectionException(
                        CommentCollectionException.TitleAlreadyExists());
            }
            Comment commentToUpdate = commentWithId.get();
            BeanUtils.copyProperties(newComment, commentToUpdate);

            // To make sure that newComment doesn't get added as a new document
            commentToUpdate.setId(id);
            commentRepo.save(commentToUpdate);
        } else {
            throw new CommentCollectionException(
                    CommentCollectionException.NotFoundException(id));
        }
    }



    public void deleteCommentById(String id) throws CommentCollectionException
    {
        Optional<Comment> commentOptional=commentRepo.findById(id);
        if(!commentOptional.isPresent())
        {
            throw new CommentCollectionException(CommentCollectionException.NotFoundException(id));
        }
        else
        {
            commentRepo.deleteById(id);
        }
    }

}


