
const express = require('express');

const app = express();

// Определете порт
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
~
app.listen(port, () => {
  console.log(`Сървърът работи на http://localhost:${port}`);
});
