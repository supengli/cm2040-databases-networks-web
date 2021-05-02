// The index.js file of your application
const express = require("express");
const logger = require("morgan");
const app = express(); const port = 8086;

app.use(logger("combined"));
require("./routes/main")(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));