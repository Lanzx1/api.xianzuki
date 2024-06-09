const express = require('express');
const app = express();
const port = 3000;
const users = [];

app.use(express.json());

// Menambahkan user
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(`User added: ${user.name}`);
});

// Mengembalikan daftar user
app.get('/users', (req, res) => {
    res.json(users);
});

// Mengembalikan leaderboard user
app.get('/leaderboard', (req, res) => {
    users.sort((a, b) => b.score - a.score);
    res.json(users);
});

// Mengupdate score user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        res.status(404).send(`User not found: ${id}`);
    } else {
        user.score = req.body.score;
        res.status(200).send(`Score updated for user: ${id}`);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
