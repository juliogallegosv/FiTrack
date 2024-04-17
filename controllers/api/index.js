const router = require("express").Router();

const userRoutes = require("./userRoutes");
const followRoutes = require("./followRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/follow", followRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;