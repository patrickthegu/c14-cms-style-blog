const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// Render all posts by logged in user
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ["id", "title", "content", "user_id", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_content", "post_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
    .then(postData => {
        const posts = postData.maps(post => post.get({ plain: true }));
        res.render('dashboard', { posts, logged_in: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Render new post page
router.get('/newpost', (req, res) => {
    res.render('post-new')
});

// Render edit post page
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "title", "content", "user_id", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_content", "post_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
    .then(postData => {
        const post = postData.get({ plain: true });
        res.render('post-edit', { post, logged_in: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
