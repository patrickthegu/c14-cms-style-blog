const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ["id", "username", "email", "password"]
    })
    .then(userData => res.json(userData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
})


// get comments and posts from one user
router.get('/:id', (req, res) =>{
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id"],
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content", "user_id", "created_at"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_content", "post_id", "created_at"]
            }
        ]
    })
    .then(Data => res.json(Data))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;
