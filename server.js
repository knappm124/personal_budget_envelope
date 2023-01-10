const express = require('express');
const app = express();

const { envelopes } = require('./data');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})