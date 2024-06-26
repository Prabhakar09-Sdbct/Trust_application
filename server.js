const express = require('express');
const bodyParser = require('body-parser');
const { createPool } = require('mysql2/promise');
const cors = require('cors');  // Import cors package

const app = express();
const port = 3001;

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'trustdb',
});
console.log('Pool config:', pool.config);

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:3000'  // Replace with your React app's origin
}));

app.use(bodyParser.json());

app.post('/add', async (req, res) => {
  const { number, date, name, amount, paymentDetails, datedOn } = req.body;
  console.log("response",req.body);
  console.log("name",name);
  console.log('Pool config:', pool.config);

  try {
    const [result] = await pool.query(
      'INSERT INTO receipts (number, date, name, amount, paymentDetails, datedOn) VALUES (?, ?, ?, ?, ?, ?)',
      [number, date, name, amount, paymentDetails, datedOn]
    );
    res.status(200).json({ message: 'Receipt added successfully', result });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});


app.get('/getReceipts', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log('Connection acquired from pool');

    const [rows] = await connection.query('SELECT * FROM receipts');
    connection.release();
    console.log('Connection released back to pool');

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
