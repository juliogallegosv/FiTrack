const router = require("express").Router();
const { Post, Comment } = require('../../models');
const authCheck = require("../../utils/auth");

router.post("/", authCheck, async (req, res) => {
    try {

        req.body.user_id = req.session.user_id;

        var comment = await Comment.create(req.body);

        if (comment) {
            res.status(200).json({ message: "Successful comment creation" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.put("/", authCheck, async (req, res) => {
    try {

        var comment = await Comment.findOne({
            where: {
                id: req.body.id,
                user: req.session.user_id
            }
        });

        if (comment) {
            comment.set(req.body);
            var saved = comment.save();
            if (saved) {
                res.status(200).json({ message: "Successfully updated comment"});
            }
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete("/", authCheck, async (req, res) => {
    try {

        var comment = await Comment.findOne({
            where: {
                id: req.body.id,
                user: req.session.user_id
            }
        });
        
        var destroyed = await comment.destroy();

        if (destroyed) {
            res.status(200).json({ message: "Successfully deleted comment" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;