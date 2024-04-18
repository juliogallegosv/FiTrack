const router = require("express").Router()
const { User, Post, UserFollower } = require('../models');
const authCheck = require("../utils/auth");

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/", authCheck, async (req, res) => {

    var post = await Post.findAll({ raw: true });

    post = post.slice(-5);

    res.render("home", post);

});

router.get("/profile", authCheck, async (req, res) => {

    var user = await User.findOne({
        attributes: { 
            exclude: ['password'] 
        },
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

    res.render("myProfile", {user, post});

});

router.get("/create", authCheck, (req, res) => {
    res.render("create");
});

router.get("/profile/:id", authCheck, async (req, res) => {

    var user = await User.findOne({
        attributes: { 
            exclude: ['password'] 
        },
        where: {
            id: req.params.id
        },
        raw: true
    });
    
    if (user.private){
        res.render("profile", {private})
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

        res.render("profile", {user, post, comment});

    }
});

router.get("/following", authCheck, async (req, res) => {

    var followings = await UserFollower.findAndCountAll({
        attributes: { 
            exclude: ['password'] 
        },
        where: {
            following_id: req.session.user_id
        },
        raw: true
    });

    res.render("following", followings);

});

router.get("/followers", authCheck, async(req, res) => {

    var followers = await UserFollower.findAndCountAll({
        attributes: { 
            exclude: ['password'] 
        },
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


//   router.get('/home',  async (req, res) => {
//     try {
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] }
//       });
  
//       const users = userData.map((user) => user.get({ plain: true }));
//       console.log(users)
//       res.render('home', {
//         users,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// Update the "/" route to redirect to "/login"
// router.get("/", (req, res) => {
//     res.redirect("/login");
// });

module.exports = router;