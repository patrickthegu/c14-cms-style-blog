const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
// const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ["id", "comment_content", "post_id"],
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content", "user_id"],
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



module.exports = router;
