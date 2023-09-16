require('dotenv').config();

const express = require('express');
const path = require('path');


const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(usersRoutes);


app.listen('3001', () => console.log('Server running in port 3001'));