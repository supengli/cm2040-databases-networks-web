// The main.js file of your application
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.html")
    });
    app.get("/search", function (req, res) {
        res.render("search.html");
    });
    app.get("/about", function (req, res) {
        res.render("about.html");
    });
    app.get("/search-result", function (req, res) {
        //searching in the database
        res.send("This is the keyword you entered: " + req.query.keyword + "<br>" + "This is the result of the search:");
    });
    app.get("/register", function (req, res) {
        res.render("register.html");
    });
    app.post("/registered", function (req, res) {
        // saving data in database
        res.send("Hello " + req.body.first + " " + req.body.last + ", you are now   registered!");
    });
    app.get("/list", function (req, res) {
        // query database to get all the books
        let sqlquery = "SELECT * FROM books";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) { res.redirect("/"); }
            res.render("list.html", { availableBooks: result });
        });
    });
    app.get("/addbook", (req, res) => {
        res.render("addbook.html");
    })
    app.post("/bookadded", (req, res) => {

        db.query("INSERT INTO books SET ?", req.body, function (error, results, fields) {
            if (error) {
                return console.error("error: " + error.message);
            }
            else {
                console.log(results.insertId);
                res.send(" This book is added to database, name: " + req.body.name + " price " + req.body.price);
            }              
        });
    })
    app.get("/search-result-db", function (req, res) {
        // execute sql query
        db.query("SELECT * FROM books WHERE name like ?", [req.query.keyword], (error, results) => {
            if (error) {
                return console.error("No book found with the keyword you have entered" + req.query.keyword + "error: " + err.message);
            }
            else {
                res.render('list.html', { availableBooks: results });
            }
        });
    });
}
