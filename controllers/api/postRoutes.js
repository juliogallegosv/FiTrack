const router = require("express").Router();
const { Post } = require('../../models');
const authCheck = require("../../utils/auth");

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

router.put("/", authCheck, async (req, res) => {
    try {

        var post = await Post.findOne({
            where: {
                id: req.body.id,
                user_id: req.session.user_id
            }
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

router.delete("/", authCheck, async (req, res) => {
    try {

        var post = await Post.findOne({
            where: {
                id: req.body.id,
                user_id: req.session.user_id
            }
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