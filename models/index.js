const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const UserFollower = require("./UserFollower");

User.hasMany(Post, {
    foreignKey: "user_id"
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

// ! There is good chance these associations don't work

User.belongsToMany(User, {
    as: "Followers",
    through: UserFollower,
    foreignKey: "follower_id",
    otherKey: "following_id"
});

User.belongsToMany(User, {
    as: "Followings",
    through: UserFollower,
    foreignKey: "following_id",
    otherKey: "follower_id"
});

module.exports = {User, Post, Comment, UserFollower};