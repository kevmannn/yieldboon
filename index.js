const express = require('express');
const { join } = require('path');

const app = express();

app.use(express.static(join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
})

app.listen(4000);
