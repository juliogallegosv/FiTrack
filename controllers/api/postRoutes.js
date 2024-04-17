const router = require("express").Router();
const { Post } = require('../../models');

//TODO: Check if logged in middleware
router.post("/", async (req, res) => {
    try {

        req.body.user_id = req.session.user_id;

        var post = await Post.create(req.body);

        if (post) {
            res.status(200).json({ message: "Successful post creation" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//TODO: Check if logged in middleware
router.put("/", async (req, res) => {
    try {

        var post = await Post.findOne({
            where: {
                id: req.body.id,
                user_id: req.session.user_id
            },
            raw: true
        });

        if (post) {
            post.set(req.body);
            var saved = post.save();
            if (saved) {
                res.status(200).json({ message: "Successfully updated post"});
            }
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//TODO: Check if logged in middleware
router.delete("/", async (req, res) => {
    try {

        var post = await Post.findOne({
            where: {
                id: req.body.id,
                user_id: req.session.user_id
            },
            raw: true
        });

        var destroyed = await post.destroy()

        if (destroyed) {
            res.status(200).json({ message: "Successfully deleted post"});
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;