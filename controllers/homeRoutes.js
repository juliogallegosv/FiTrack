const router = require("express").Router()
const bcrypt = require('bcrypt');
const { User, Post, UserFollower, Comment } = require('../models');
const authCheck = require("../utils/auth");

//login route
router.get("/login", (req, res) => {
    res.render("login");
});

// //?login post route
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ where: { email } });

//         // If user not found or password incorrect, redirect back to login page
//         if (!user || !await bcrypt.compare(password, user.password)) {
//             return res.status(401).redirect('/login');
//         }

//         // Set user session
//         req.session.user_id = user.id;

//         // Redirect to dashboard
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// Sign up route
router.get("/signup", (req, res) => {
    res.render("signup");
});

// About you route
router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/", authCheck, async (req, res) => {
    var post = await Post.findAll({
        include: {
            model: User,
            attributes: {
                exclude: [
                    "password",
                    "email",
                    "description",
                    "gender",
                    "country",
                    "units",
                    "private",
                    "createdAt",
                    "updatedAt"
                ],
                include: ["username", "id", "name"]
            }
        },
        raw: true 
    });
    latestPosts = post.slice(-5); // Get the 5 latest posts
    res.render("home", {latestPosts});
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
        include: {
            model: User,
            attributes: {
                exclude: [
                    "password",
                    "email",
                    "description",
                    "gender",
                    "country",
                    "units",
                    "private",
                    "createdAt",
                    "updatedAt"
                ],
                include: ["username", "id", "name"]
            }
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
        res.render("profile", { private: true });
    } else {
        var isFollowed = await UserFollower.findOne({
            where:{
                follower_id: req.session.user_id,
                following_id: req.params.id
            },
            raw: true
        }) ? true : false;
        var post = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            include: {
                model: User,
                attributes: {
                    exclude: [
                        "password",
                        "email",
                        "description",
                        "gender",
                        "country",
                        "units",
                        "private",
                        "createdAt",
                        "updatedAt"
                    ],
                    include: ["username", "id", "name"]
                }
            },
            raw: true
        });
        res.render("profile", { user, post, isFollowed});
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
    res.render("following", {followings});
});

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

router.get("/aboutedit", authCheck, async (req, res) => {
    var user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        raw: true
    });
    res.render("aboutEdit", {user});
});

router.get("/post/:id", authCheck, async (req, res) => {
    var post = await Post.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    });
    if (post){
        var comment = await Comment.findAll({
            where: {
                post_id: post.id
            }, 
            
            raw: true 
        });
        console.log(comment)
        res.render("post", {post, comment});
    }
});

module.exports = router;

