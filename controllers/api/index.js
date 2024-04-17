const router = require("express").Router();

const userRoutes = require("./userRoutes");
const followRoutes = require("./followRoutes");

router.use("/user", userRoutes);
router.use("/follow", followRoutes);

module.exports = router;