const router = require("express").Router();
const { User } = require('../../models');

router.post("/login", async (req, res) => {
    try {

        var user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user && user.checkPassword(req.body.password)) {
                req.session.save(() => {
                    req.session.user_id = user.id;
                    req.session.logged_in = true;

                    res.status(200).json({ message: "Successful login" });
                });
        } else {
            res.status(400).json({ message: "Wrong Username or password" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post("/signup", async (req, res) => {
    try {

        if (false) {
            // TODO: Ensure request string lengths are good
            // TODO: Ensure email is valid
            // TODO: Optionally ensure password is valid (maybe)
            res.status(400).json({ message: "Bad request string length" })
        }

        var user = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        
        if (user) {
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.logged_in = true;

                res.status(200).json({ message: "Successful sign up" });
            });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//TODO: Check if logged in middleware
router.post("/logout", (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(200).json({ message: "Successful log out" })
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//TODO: Check if logged in middleware
//! GOOD CHANCE THIS ROUTE DOES NOT WORK YET
router.put("/", async (req, res) => {
    try {

        var user = await User.findOne({
            id: req.session.user_id
        });

        var json;

        req.body.username ? json.username = req.body.username : 0
        req.body.password ? json.password = req.body.password : 0
        req.body.email ? json.email = req.body.email : 0
        req.body.name ? json.name = req.body.name : 0
        req.body.description ? json.description = req.body.description : 0
        req.body.gender ? json.gender = req.body.gender : 0
        req.body.country ? json.country = req.body.country : 0
        req.body.private ? json.private = req.body.private : 0
        
        if (user && json) {
            user.set(json);
            var saved = user.save()
            if (saved) {
                res.status(200).json({ message: "Successfully updated user"})
            } else {
                res.status(400).json({ message: "Failed to update user"})
            }
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router