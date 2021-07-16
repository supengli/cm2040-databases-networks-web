const util = require('util');
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "midterm"
});

const dbRun = util.promisify(db.query.bind(db));

async function createTables() {
    await dbRun(`DROP TABLE IF EXISTS devices;`);
    await dbRun(`DROP TABLE IF EXISTS devicesAdded;`);
    await dbRun(`CREATE TABLE IF NOT EXISTS devices (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name CHAR(30) NOT NULL,
        fields JSON NOT NULL,
        PRIMARY KEY (id));`);
    await dbRun(`CREATE TABLE IF NOT EXISTS devicesAdded (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name CHAR(30) NOT NULL,
        fields JSON NOT NULL,
        PRIMARY KEY (id));`);
    await dbRun(`INSERT INTO devices(name, fields)
    VALUES
        ('Curtain','[{"field_name": "open/close", "field_type": "boolean"}]'),
        ('Lighting','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('TV','[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "volume", "field_type": "number"}]'),
        ('Music player','[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "volume", "field_type": "number"}]'),
        ('Fridge-freezer', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "open/close", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]'),
        ('Heating', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]'),
        ('Cooling', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]');`);
}
createTables().then(value => process.exit(1)).catch(error => console.log(error))