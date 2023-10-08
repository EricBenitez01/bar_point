require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoute = require('./routes/authRoute');
const usersRoutes = require('./routes/usersRoutes');
const benefitsRoutes = require('./routes/benefitsRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const transaction = require('./routes/transactionRoute');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configurar opciones de CORS
const corsOptions = {
    origin: 'http://localhost:4200', // Dominio de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200, // Algunas versiones de navegadores antiguos (IE11, por ejemplo) requieren esto
};
  
// Aplicar CORS solo a la ruta /users
app.use(authRoute, cors(corsOptions));
app.use(usersRoutes, cors(corsOptions));
app.use(benefitsRoutes);
app.use(purchaseRoutes);
app.use(transaction);


app.listen('3001', () => console.log('Server running in port 3001'));