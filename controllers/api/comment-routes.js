const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ["id", "comment_content", "post_id", "created_at"],
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content", "user_id", "created_at"],
            },
            {
                model: User,
                attributes: ["id", "username", "email", "password"],
            }
        ]
    })
    .then(commentData => res.json(commentData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Create new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            coment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(newCommentData => res.json(newCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
})

// Delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deleteCommentData => {
        if (!deleteCommentData) {
            res.status(404).json({message: 'No comment found with this id to delete'});
            return;
        }
        res.json(deleteCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
