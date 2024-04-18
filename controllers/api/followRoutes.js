const router = require("express").Router();
const { User, UserFollower } = require('../../models');
const authCheck = require("../../utils/auth");

router.post("/", authCheck, async (req, res) => {
    try {

        var user = await User.findOne({
            where: {
                id: req.body.follow_id
            }
        });

        if (user) {
            var created = await UserFollower.create({
                follower_id: req.session.user_id,
                following_id: req.body.follow_id
            });
            if (created) {
                res.status(200).json({ message: "Successfully followed"})
            }
        } else {
            res.status(400).json({ message: "Error: user doesn't exist" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete("/", authCheck, async (req, res) => {
    try {

        var userFollower = await UserFollower.findOne({
            where: {
                follower_id: req.session.user_id,
                following_id: req.body.following_id
            }
        });
        
        var destroyed = await userFollower.destroy()

        if (destroyed) {
            res.status(200).json({ message: "Successfully unfollowed" })
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;