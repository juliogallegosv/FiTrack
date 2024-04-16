const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

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

User.hasMany(User, {
    foreignKey: "followers"
});

User.belongsTo(User, {
    foreignKey: "followers"
});

User.hasMany(User, {
    foreignKey: "following"
});

User.belongsTo(User, {
    foreignKey: "following"
})