const router = require("express").Router();

const userRoutes = require("./userRoutes");
const followRoutes = require("./followRoutes");
const postRoutes = require("./postRoutes");

router.use("/user", userRoutes);
router.use("/follow", followRoutes);
router.use("/post", postRoutes);

module.exports = router;