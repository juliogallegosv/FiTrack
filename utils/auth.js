const authCheck = (req, res, next) => {
    try {
        if (!req.session.logged_in) {
            res.redirect("/login");
        } else {
            next();
        }
    } catch {
        res.redirect("/login");
    }
}
module.exports = authCheck;