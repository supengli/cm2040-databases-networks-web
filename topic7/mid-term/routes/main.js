// The main.js file of your application
module.exports = function (app) {
    // A route for R1 Home page
    app.get("/", function (req, res) {
        res.render("home.html")
    });
};