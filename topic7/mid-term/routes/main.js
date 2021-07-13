// The main.js file of your application
module.exports = function (app) {
    // A route for R1 Home page
    app.get("/", function (req, res) {
        res.render("home.html");
    });

    // A route for R2: About page
    app.get("/aboutPage", function (req, res) {
        res.render("about.html");
    });

    // A route for R3A:
    app.get("/addPage", function (req, res) {
        dbRun("SELECT name, fields FROM devices;").then(value =>res.render("add.ejs", devices=value));
    });

    // A aroute for R3B
    app.post("/add", function (req, res) {
        console.log(req.body);
        const {deviceName, ...fields}  = req.body;
        const device = {name: deviceName, fields: JSON.stringify(fields)};
        dbRun("INSERT INTO devicesAdded SET ?;", device).then( value => dbRun("SELECT name, fields FROM devices;")).then(value =>res.render("add.ejs", devices=value));
        ;
    })
};