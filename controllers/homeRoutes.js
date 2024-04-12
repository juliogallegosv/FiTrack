const router = require("express").Router()

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/profile", (req, res) => {
    res.render("myProfile");
});

router.get("/create", (req, res) => {
    res.render("create");
});

router.get("/profile/:id", (req, res) => {
    res.render("profile");
});

router.get("/following", (req, res) => {
    res.render("following");
});

router.get("/followers", (req, res) => {
    res.render("followers");
});

router.get("/aboutedit", (req, res) => {
    res.render("aboutEdit");
});


module.exports = router;