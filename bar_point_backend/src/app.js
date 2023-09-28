require('dotenv').config();

const express = require('express');
const path = require('path');

const authRoute = require('./routes/authRoute');
const usersRoutes = require('./routes/usersRoutes');
const benefitsRoutes = require('./routes/benefitsRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authRoute);
app.use(usersRoutes);
app.use(benefitsRoutes);
app.use(purchaseRoutes);

app.listen('3001', () => console.log('Server running in port 3001'));