const { join } = require('path');
const express = require('express');

const app = express();

app.use(express.static(join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
})

app.listen(4000);
