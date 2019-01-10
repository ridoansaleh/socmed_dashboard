const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use('/', express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(port, () => {
    console.info(`Your app is running on http://localhost:${port}`);
}).on('error', () => {
    console.error('There is an error : ', error);
});