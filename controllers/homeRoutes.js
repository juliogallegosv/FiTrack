const router = require("express").Router();
const { User, Post } = require('../models');

// Home (login) route
router.get("/", (req, res) => {
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
        // Assuming Comment model is imported and defined
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

module.exports = router;
