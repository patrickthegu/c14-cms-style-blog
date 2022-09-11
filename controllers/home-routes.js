const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

const withAuth = require('../utils/auth');

// Render all posts on homepage
router.get('/', async (req, res) => {
    Post.findAll({
        attributes:
    })
})

// Render login page

// Render signup page
router.get('/signup')

module.exports = router;
