const express = require('express')
const app = express;

app.use(express.json())

const PORT = 4000;

app.get('/cars', async (req, res) => {
    if (req.query) {
    if (req.query.id) {
    // http://localhost:4000/cars?id=1
    const task = await sql`SELECT * FROM cars WHERE Id =
    ${req.query.id};`;
    if (task.rowCount > 0) {
    res.json(task.rows[0]);
    } else {
    res.status(404).json();
    }
    return;
    }
    }
    const cars = await sql`SELECT * FROM cars ORDER BY Id;`;
    res.json(cars.rows);
    });

// http://localhost:4000/cars/1
app.get('/cars/:id', async (req, res) => {
    const id = req.params.id;
    const task = await sql`SELECT * FROM cars WHERE Id =
    ${id};`;
    if (task.rowCount > 0) {
    res.json(task.rows[0]);
    } else {
    res.status(404).json();
    }
    });


// http://localhost:4000/cars - { "name": "New Task" }
app.post('/cars', async (req, res) => {
    await sql`INSERT INTO cars (Name) VALUES
    (${req.body.name});`;
    res.status(201).json();
    });


//http://localhost:4000/cars/1 - { "name": "Task 1 Updated", "isDone": true } | { "name": "Task 1 Updated" } | { "isDone":  true }
    app.put('/cars/:id', async (req, res) => {
    const id = req.params.id;
    const taskUpdate = await sql`UPDATE cars SET Name = ${
    (req.body.name != undefined ? req.body.name : task.name)
    }, IsDone = ${
    (req.body.isDone != undefined ? req.body.isDone :
    task.isDone)
    } WHERE Id = ${id};`;
    if (taskUpdate.rowCount > 0) {
    const task = await sql`SELECT * FROM cars WHERE Id =
    ${id};`;
    res.status(200).json(task.rows[0]);
    } else {
    res.status(404).json();
    }
    });

// http://localhost:4000/cars/1
app.delete('/cars/:id', async (req, res) => {
const id = req.params.id;
const task = await sql`DELETE FROM cars WHERE Id = ${id};`;
if (task.rowCount > 0) {
res.status(204).json();
} else {
res.status(404).json();
}
});

module.exports = app