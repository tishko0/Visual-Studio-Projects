const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Configure the PostgreSQL connection
const pool = new Pool({
    user: 'Tonkisa69',
    host: 'localhost',
    database: 'myapp',
    password: '123456',
    port: 5432
});

app.use(bodyParser.json());

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Невалиден имейл или парола.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Невалиден имейл или парола.' });
        }

        res.json({ email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Вътрешна грешка на сървъра.' });
    }
});

// Registration route
app.post('/register', async (req, res) => {
    const { nickname, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Потребител с този имейл вече съществува.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3) RETURNING *',
            [nickname, email, hashedPassword]
        );

        const newUser = result.rows[0];
        res.json({ nickname: newUser.nickname, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: 'Вътрешна грешка на сървъра.' });
    }
});

// Forgot Password route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    // Implement email sending logic here
    res.json({ message: 'Инструкциите за нулиране на паролата са изпратени.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
