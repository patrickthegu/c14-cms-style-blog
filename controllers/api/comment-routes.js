const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
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

// get comments from one user
router.get('/:id', (req, res) =>{
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id"],
        include: [
            {
                model: 
            }
        ]
    })
})

// Create new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            coment_text: req.body.comment_text,
            post_id: req.session.post_id,
            user_id: req.session.user_id
        })
    }
})

// Delete comment
router.delete('/:id', withAuth, (req, res) => {
    if 
})

module.exports = router;
