const { Client } = require('pg');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware за парсване на form данни
app.use(bodyParser.urlencoded({ extended: true }));

// Статична папка за публични файлове
app.use(express.static(path.join(__dirname)));

// Показва login.html когато посетите началната страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'loginpage2.0.html'));
});

// Обработва входната форма
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Проверка за потребител и парола (примерен код)
    if (username === 'teacher' && password === '1234') {
        res.redirect('/teachers');
    } else {
        res.send('Невалидно потребителско име или парола!');
    }
});

// Показва teachers.html
app.get('/teachers', (req, res) => {
    res.sendFile(path.join(__dirname, 'Teachers.html'));
});

// Стартира сървъра
app.listen(port, () => {
    console.log(`Сървърът работи на http://localhost:${port}`);
});
const { Client } = require('pg');

// Database connection details
const client = new Client({
  user: 'Tonkisa69',         
  host: 'localhost',             
  database: 'Users1', 
  password: '123456',     
  port: 5432,                     
});

// Function to connect to the PostgreSQL database
async function connectToDatabase() {
  try {
    await client.connect(); // Connect to the database
    console.log('Connected to PostgreSQL database successfully');
    
    // Perform a simple query (optional)
    const res = await client.query('SELECT NOW()'); // Query to get current date and time
    console.log('Current Time:', res.rows[0]);

  } catch (err) {
    console.error('Error connecting to the database', err);
 
  }
}

// Execute the connection function
connectToDatabase();
