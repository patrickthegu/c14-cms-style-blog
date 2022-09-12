const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

const withAuth = require('../utils/auth');

// Render all posts on homepage
router.get('/', async (req, res) => {
    Post.findAll({
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
        // clean data
        const posts = postData.map(post => post.get({ plain: true}));
        res.render('home', { posts, logged_in: req.session.logged_in})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Render login page and redirect to home if already logged in
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Render single post
router.get('/post/:id', (req, res) => {
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
        if (!postData) {
            res.status(404).json({ message: 'Post with this id not found'});
            return;
        }
        // clean data
        const post = postData.get({ plain: true });
        res.render('singlepost', {post, logged_in: req.session.logged_in})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
