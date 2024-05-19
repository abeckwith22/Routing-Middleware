const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/items', routes);

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});