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
        ('Toaster','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Kettle','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('CCTV','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Nintendo-Switch','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Xbox','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Playstation','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Vacuum-cleaner','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Dryer','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Washing-machine','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Wine-cellar','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Camera','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Video-player','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Computer','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Cooling', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]');`);
}
createTables().then(value => process.exit(1)).catch(error => console.log(error))