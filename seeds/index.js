const sequelize = require("../config/conection.js");
const { User, Post, Comment, UserFollower } = require("../models");

const users = require("./users.json");
const posts = require("./posts.json");
const comments = require("./comments.json");
const userfollowers = require("./userfollowers.json");

(async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(users, {
        individualHooks: true
    });
    await UserFollower.bulkCreate(userfollowers);
    await Post.bulkCreate(posts);
    await Comment.bulkCreate(comments);

    
    console.log(await User.findAll({raw: true, include: "Followers"}))

    process.exit(0);
})();