const express = require('express');
const port = 3000;
const path = require('path');
const app = express();

// Статична папка за публични файлове
app.use(express.static(path.join(__dirname)));

// Показва login.html когато посетите началната страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'loginpage2.0.html'));
});

// Обработва входната форма
app.post('/login', (req, res) => {
    const { username, password } = req.body;
});

// Показва teachers.html
app.get('/teachers', (req, res) => {
    res.sendFile(path.join(__dirname, 'Teachers.html'));
});

// Стартира сървъра
app.listen(port, () => {
    console.log(`Сървърът работи на http://localhost:${port}`);
});