const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "content", "user_id"],
        include: [
            {
                model: User,
                attributes: ["id", "username", "email", "password"],
            }
        ]
    })
    .then(postData => res.json(postData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;
