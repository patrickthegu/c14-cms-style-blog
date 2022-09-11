const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users are able to make many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// Users can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Each post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Each post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment};