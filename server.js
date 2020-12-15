const express = require('express');

const app = express();

app.get('/connect', (req, res) => {
    res.json('Server connected');
});

const port = 5000;

app.listen(port, () => console.log('Server started on port ' + port));