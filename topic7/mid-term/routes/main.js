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

    // A route for R3B
    app.post("/add", function (req, res) {
        const {deviceName, ...fields}  = req.body;
        dbRun("INSERT INTO devicesAdded SET ?;", {name: deviceName, fields: JSON.stringify(fields)}).
        then(value =>res.render("message.ejs", message={title: `${deviceName} inserted`, body: `A new ${deviceName} with has been successfully inserted!`}));
        ;
    })

    // A route for R4A: Show device page
    app.get("/showPage", function (req, res) {
        dbRun("SELECT name, fields FROM devices;").then(value =>res.render("show.ejs", {devices: value, selectedDevice: undefined},));        
    });

    // Return selected device data
    app.get("/showDashboard", function (req, res) {
        let deviceName = req.query.deviceName;
        dbRun("SELECT id, name, fields FROM devicesAdded WHERE ?", {name: deviceName}).
        then(value => {
            // If not found return a message
            if (value.length == 0) {
                return Promise.reject(0);
            }
            else {
                // Otherwise, return selcted device data
                res.render("show.ejs", {devices: [value[0]], selectedDevice: value}) 
            };
        }).catch(error => res.render("message.ejs", message={title: `${deviceName} is not found`, body: `No ${deviceName} has been inserted before`}))
        ;        
    });
};