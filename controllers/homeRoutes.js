const router = require("express").Router()
const { User, Post, UserFollower, Comment } = require('../models');
const authCheck = require("../utils/auth");

router.get("/login", (req, res) => {
    res.render("login");
});

// Sign up route
router.get("/signup", (req, res) => {
    res.render("signup");
});

// About you route
router.get("/about", (req, res) => {
    res.render("about");
});

// Dashboard (feed) route
router.get("/dashboard", async (req, res) => {
    try {
        const posts = await Post.findAll({ raw: true });
        const latestPosts = posts.slice(-5); // Get the latest 5 posts
        res.render("feed", { posts: latestPosts }); // Render the feed view with the latest posts
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
});

// Profile route
router.get("/profile", async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, { raw: true });
        res.render("myProfile", user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user profile');
    }
});

// Add workout route
router.get("/create", (req, res) => {
    res.render("create");
});

// View other profile route
router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { raw: true });
        const posts = await Post.findAll({ where: { user_id: req.params.id }, raw: true });
        const comments = await Comment.findAll({ where: { blog_id: posts.map(post => post.blog_id) }, raw: true });
        res.render("profile", { user, posts, comments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching profile');
    }
});

// View following route
router.get("/following", (req, res) => {
    res.render("following");
});

// View followers route
router.get("/followers", (req, res) => {
    res.render("followers");
});

// About you (edit) route
router.get("/aboutedit", async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, { raw: true });
        res.render("aboutEdit", user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data');
    }
});

router.get("/", authCheck, async (req, res) => {
    var post = await Post.findAll({ raw: true });
    post = post.slice(-5);
    res.render("home", post);
});

router.get("/profile", authCheck, async (req, res) => {
    var user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        },
        raw: true
    });

    var post = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        raw: true
    });

    console.log(post);

    res.render("myProfile", { user, post });
});

router.get("/create", authCheck, (req, res) => {
    res.render("create");
});

router.get("/profile/:id", authCheck, async (req, res) => {
    var user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        raw: true
    });
    if (user.private) {
        res.render("profile", { private })
    } else {
        var post = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            raw: true
        });
        var comment = await Comment.findAll({
            where: {
                blog_id: post.blog_id
            },
            raw: true
        });
        res.render("profile", { user, post, comment });
    }
});

router.get("/following", authCheck, async (req, res) => {
    var followings = await UserFollower.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: {
            following_id: req.session.user_id
        },
        raw: true
    });
    res.render("following", followings);
});

router.get("/followers", authCheck, async (req, res) => {
    var followers = await UserFollower.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: {
            follower_id: req.session.user_id
        },
        raw: true
    });
    res.render("followers", followers);
});

router.get("/aboutedit", authCheck, async (req, res) => {
    var user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        raw: true
    });
    res.render("aboutEdit", user);
});

module.exports = router;

