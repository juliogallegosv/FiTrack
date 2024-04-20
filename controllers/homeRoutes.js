const router = require("express").Router()
const bcrypt = require('bcrypt');
const { User, Post, UserFollower, Comment } = require('../models');
const authCheck = require("../utils/auth");

// Home route
router.get("/", authCheck, async (req, res) => {
    if (req.session.user_id) {
        // If user is logged in, redirect to feed
        res.redirect('/feed');
    } else {
        // If user is not logged in, render login page
        res.render("login");
    }
});

//login route
router.get("/login", (req, res) => {
    res.render("login");
});

//* login post route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        // If user not found or password incorrect, redirect back to login page
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).redirect('/login');
        }

        // Set user session
        req.session.user_id = user.id;

        // Redirect to feed
        res.redirect('/feed');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Sign up route
router.get("/signup", (req, res) => {
    res.render("signup");
});

// About you route
router.get("/about", (req, res) => {
    res.render("about");
});

// Feed route (Dashboard)
router.get("/feed", authCheck, async (req, res) => {
    var post = await Post.findAll({ raw: true });
    latestPosts = post.slice(-5); // Get the 5 latest posts
    res.render("feed", {latestPosts});
});

// Profile route
router.get("/profile", authCheck, async (req, res) => {
    var user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        },
        raw: true
    });

    var posts = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        raw: true
    });

    res.render("myProfile", { user, posts });
});

// Add Post route
router.get("/create", authCheck, (req, res) => {
    res.render("create");
});

// View other user's profile route
router.get("/profile/:id", authCheck, async (req, res) => {
    var user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        raw: true
    });
    if (user.private) {
        res.render("profile", { private: true });
    } else {
        var isFollowed = await UserFollower.findOne({
            where:{
                follower_id: req.session.user_id,
                following_id: req.params.id
            },
            raw: true
        }) ? true : false;
        var posts = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            raw: true
        });
        res.render("profile", { user, posts, isFollowed});
    }
});

// View following route
router.get("/following", authCheck, async (req, res) => {
    var followings = await UserFollower.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: {
            following_id: req.session.user_id
        },
        raw: true
    });
    res.render("following", {followings});
});

// View followers route
router.get("/followers", authCheck, async (req, res) => {
    var followers = await UserFollower.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: {
            follower_id: req.session.user_id
        },
        raw: true
    });
    res.render("followers", {followers});
});

// Edit about you route
router.get("/aboutEdit", authCheck, async (req, res) => {
    var user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        raw: true
    });
    res.render("aboutEdit", {user});
});

// View post route
router.get("/post/:id", authCheck, async (req, res) => {
    var post = await Post.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    });
    res.render("post", {post});
});

module.exports = router;

