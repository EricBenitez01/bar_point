require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const corsOptions = {
    origin: 'http://localhost:4200', // Dominio de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};



const authRoute = require('./routes/authRoute');
const usersRoutes = require('./routes/usersRoutes');
const benefitsRoutes = require('./routes/benefitsRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const transaction = require('./routes/transactionRoute');
const businessesRoutes = require('./routes/businessesRoutes');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(authRoute, cors(corsOptions));
app.use(usersRoutes, cors(corsOptions));
app.use(benefitsRoutes, cors(corsOptions));
app.use(purchaseRoutes, cors(corsOptions));
app.use(transaction, cors(corsOptions));
app.use(businessesRoutes, cors(corsOptions));



app.listen('3001', () => console.log('Server running in port 3001'));