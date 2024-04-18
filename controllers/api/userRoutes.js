const router = require("express").Router();
const { User } = require('../../models');
const authCheck = require("../../utils/auth");

router.post("/login", async (req, res) => {
    try {

        var user = await User.findOne({
            where: {
                email: String(req.body.email).trim()
            }
        });

        if (user) {
            if (user.checkPassword(req.body.password)){
                req.session.save(() => {
                    req.session.user_id = user.id;
                    req.session.logged_in = true;

                    res.status(200).json({ message: "Successful login" });
                });
            } else {
                res.status(400).json({ message: "Wrong Username or password" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post("/signup", async (req, res) => {
    try {

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

router.post("/logout", authCheck, (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(200).json({ message: "Successful log out" })
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.put("/", authCheck, async (req, res) => {
    try {

        var user = await User.findOne({
            id: req.session.user_id
        });
        
        if (user && req.body) {
            user.set(req.body);
            var saved = user.save();
            if (saved) {
                res.status(200).json({ message: "Successfully updated user"});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete("/", authCheck, async (req, res) => {
    try {

        var user = await User.findOne({
            where: {
                id: req.session.user_id,
            }
        });
        
        var destroyed = await user.destroy();

        if (destroyed) {
            res.status(200).json({ message: "Successfully deleted comment" });

        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router