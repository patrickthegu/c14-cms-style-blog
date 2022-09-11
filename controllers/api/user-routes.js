const router = require('express').Router();
const { User } = require('../../models');
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

module.exports = router;
