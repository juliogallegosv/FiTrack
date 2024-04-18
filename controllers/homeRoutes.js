const router = require("express").Router()
const { User, Post} = require('../models');

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/", async (req, res) => {

    var post = await Post.findAll({ raw: true });

    post = post.slice(-5)

    res.render("home", post);

});

router.get("/profile", async (req, res) => {

    var user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        raw: true
    });

    res.render("myProfile", user);

});

router.get("/create", (req, res) => {
    res.render("create");
});

router.get("/profile/:id", async (req, res) => {

    var user = await User.findOne({
        // include: {
            //! IMPORTANT MASSIVE SECURITY VULNERABILITY, PRIVACY CHECK STILL NEEDS TO BE DONE AND PASSWORD HASH NOT SENT
        // },
        where: {
            id: req.params.id
        },
        raw: true
    });
    
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

    res.render("profile", {user, post, comment});

});

router.get("/following", (req, res) => {
    res.render("following");
});

router.get("/followers", (req, res) => {
    res.render("followers");
});

router.get("/aboutedit", async (req, res) => {

    var user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        raw: true
    });

    res.render("aboutEdit", user);

});


module.exports = router;