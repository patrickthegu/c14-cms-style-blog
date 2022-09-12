const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ["id", "username", "email"]
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
        attributes: ["id", "username", "email"],
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
    .then(userData => {
        if (!userData) {
            res.status(404).json()
        }
        res.json(userData)
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User Signup
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        // new user is logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username - userData.username;
            req.session.logged_in = true;
        })
    })
})

// User log in
    router.post('/login', (req, res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(400).json({message: 'Email Address not found'})
                return;
            }
            const userPassword = userData.checkPassword(req.body.password);
            if (!userPassword) {
                res.status(400).json({message: 'Password is incorrect'});
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.logged_in = true;

                res.status(200).json({user: userData, message: 'Log in successful'})
            });
        });
    });

// User log out
router.post('logout', withAuth, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;