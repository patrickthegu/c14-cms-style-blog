const router = require('express').Router();
const { json } = require('express');
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "content", "user_id", "created_at"],
        include: [
            {
                model: User,
                attributes: ["id", "username", "email"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_content", "post_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["id", "username", "email"],
                }
            },
        ]
    })
    .then(postData => res.json(postData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Get a single post
router.get('/:id', (req, res) => {
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
                    attributes: ["id", "username", "email"],
                }
            },
        ]
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'Post not found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'Post not found with this id'});
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
