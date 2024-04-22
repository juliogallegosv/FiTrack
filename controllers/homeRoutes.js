const router = require("express").Router();
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

// Login route
router.get("/login", (req, res) => {
    res.render("login");
});

//* Login post route
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
router.get("/about", authCheck, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.session.user_id } });
        console.log(user); // Log user object to console
        res.render("about", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


// Dashboard route
router.get("/feed", authCheck, async (req, res) => {
    // Retrieve latest posts and render feed page
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: { exclude: ['password'] }
            },
            order: [['createdAt', 'DESC']],
            limit: 5
        });
        res.render("feed", { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Profile route
router.get("/profile", authCheck, async (req, res) => {
    // Retrieve user profile and posts and render profile page
    try {
        const user = await User.findOne({ where: { id: req.session.user_id } });
        const posts = await Post.findAll({ where: { user_id: req.session.user_id } });
        res.render("myProfile", { user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Add Post route
router.get("/create", authCheck, (req, res) => {
    res.render("create");
});

// View other user's profile route
router.get("/profile/:id", authCheck, async (req, res) => {
    // Retrieve user profile and posts and render profile page
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        const posts = await Post.findAll({ where: { user_id: req.params.id } });
        res.render("profile", { user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// View following route
router.get("/following", authCheck, async (req, res) => {
    // Retrieve users followed by the current user and render following page
    try {
        const followings = await UserFollower.findAndCountAll({ where: { follower_id: req.session.user_id } });
        res.render("following", { followings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// View followers route
router.get("/followers", authCheck, async (req, res) => {
    // Retrieve users following the current user and render followers page
    try {
        const followers = await UserFollower.findAndCountAll({ where: { following_id: req.session.user_id } });
        res.render("followers", { followers });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Edit about you route
router.get("/aboutEdit", authCheck, async (req, res) => {
    // Retrieve user details and render edit about page
    try {
        const user = await User.findOne({ where: { id: req.session.user_id } });
        res.render("aboutEdit", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// View post route
router.get("/post/:id", authCheck, async (req, res) => {
    // Retrieve post details and comments and render post page
    try {
        const post = await Post.findOne({ where: { id: req.params.id } });
        if (post) {
            const comments = await Comment.findAll({ where: { post_id: post.id } });
            res.render("post", { post, comments });
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
