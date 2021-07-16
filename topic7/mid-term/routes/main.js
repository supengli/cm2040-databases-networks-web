// The main.js file of your application
module.exports = function (app) {
    // A route for R1. This route returns the home page.
    app.get("/", function (req, res) {
        res.render("home.html");
    });

    // A route for R2. This route returns the about page.
    app.get("/aboutPage", function (req, res) {
        res.render("about.html");
    });

    // A route for R3A. This route returns an add page allowing to select a device name and correspounding fields to add.
    app.get("/addPage", function (req, res) {
        // Selects all available devices name and correspounding fields.
        // Returns a page with available devices name and correspounding fields.
        dbRun("SELECT name, fields FROM devices;").then(value =>res.render("add.ejs", devices=value));
    });

    // A route for R3B. This route is called by the form in the page rendered by the addPage endpoint.
    // Given device name and correspounding fields information, inserts the a new observation into the devicesAdded table.
    // Upon insertion, returns a page with successfully inserted mesage.
    app.post("/add", function (req, res) {
        const {deviceName, ...fields}  = req.body;
        dbRun("INSERT INTO devicesAdded SET ?;", {name: deviceName, fields: JSON.stringify(fields)}).
        then(value =>res.render("message.ejs", message={title: `${deviceName} inserted`, body: `A new ${deviceName} with has been successfully inserted!`}));
        ;
    })

    // A route for R4A. This route returns a show page to allow selecting a certain name of device.
    // Once a device name is selected, showDashboard end point is called to return the result.
    app.get("/showPage", function (req, res) {
        // Select all possible device names.
        dbRun("SELECT name, fields FROM devices;").then(value =>res.render("show.ejs", {devices: value, selectedDevice: undefined},));
    });

    // A route for R4B. Tbjs route is called by the form in the show page rendered by showPage end point.
    // Given a device name, returns any device is found. Otherwise returns a page with nothing is found message.
    app.get("/showDashboard", function (req, res) {
        const deviceName = req.query.deviceName;
        // Select all devices given a certain device name
        dbRun("SELECT id, name, fields FROM devicesAdded WHERE ?", {name: deviceName}).
        then(value => {
            // If nothing is found returns a message
            if (value.length == 0) {
                return Promise.reject(0);
            }
            else {
                // Otherwise, returns the results
                res.render("show.ejs", {devices: [value[0]], selectedDevice: value}) 
            };
        }).catch(error => res.render("message.ejs", message={title: `${deviceName} is not found`, body: `No ${deviceName} has been inserted before`}))
        ;        
    });

    // A route for R6A. This route returns a page with an input box to allow deleting a certain added device by providing a device id.
    app.get("/deletePage", function (req, res) {
        res.render("delete.html");
    });

    // A route for R6B. This route is called by the form in the delete page and handles the deletion for device.
    // If a device is successfully deleted, this route returns a page with successful message.
    // If nothing is deleted, this route returns a page with nothing deleted message.
    app.post("/delete", function (req, res) {
        const deviceId = req.body.deviceId;
        // Delete the observation for given device id
        dbRun("DELETE FROM devicesAdded WHERE ?;", {id: deviceId}).
        then(value =>{
            // If nothing is deleted send a message to tell the user the specified device id is not found
            if (value.affectedRows === 0) {
                return Promise.reject(0);
            }
            // Otherwise, tell the user the specified device id has been deleted
            res.send(res.render("message.ejs", message={title: `${deviceId} is deleted`, body: `The device with device id ${deviceId} has been deleted`}))
        }).catch(value => res.render("message.ejs", message={title: `${deviceId} is not found`, body: `No device with device id ${deviceId} has been inserted before`}));
    });

    // A route for R5A. This route returns a page with listed added devices and form to allow updating a certain added device by clicking a device id.
    app.get("/updatePage", async function (req, res) {
        const devices = await dbRun("SELECT name, fields FROM devices;")
        const addedDevices = await dbRun("SELECT id, name FROM devicesAdded;");

        res.render("update.ejs", {devices, addedDevices});
    });

    // A route for R5B. This route is called by the form in the update page and handles the update for device.
    // If a device is successfully updated, this route returns a page with successful message.
    // If nothing is updated, this route returns a page with nothing updated message.
    app.post("/update", function (req, res) {
        const {deviceId, ...fields}  = req.body;

        // Update the fields for given device id and fields
        dbRun("UPDATE devicesAdded SET fields = ? WHERE id = ?;", [JSON.stringify(fields), Number(deviceId)]).
        then(value =>{
            // If nothing is updated send a message to tell the user the specified device id is not found
            if (value.affectedRows === 0) {
                return Promise.reject(0);
            }
            // Otherwise, tell the user the specified device id has been updated
            res.send(res.render("message.ejs", message={title: `${deviceId} is updated`, body: `The device with device id ${deviceId} has been updated`}))
        }).catch(value => res.render("message.ejs", message={title: `${deviceId} is not found`, body: `No device with device id ${deviceId} has been inserted before`}));
    });

};