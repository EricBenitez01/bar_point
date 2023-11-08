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
//const transaction = require('./routes/transactionRoute');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(authRoute, cors(corsOptions));
app.use(usersRoutes, cors(corsOptions));
app.use(benefitsRoutes, cors(corsOptions));
//app.use(purchaseRoutes, cors(corsOptions));
//app.use(transaction, cors(corsOptions));



app.listen('3001', () => console.log('Server running in port 3001'));

/* require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoute = require('./routes/authRoute');
const usersRoutes = require('./routes/usersRoutes');
const benefitsRoutes = require('./routes/benefitsRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const transaction = require('./routes/transactionRoute');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200', // Dominio de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

// Configurar opciones de CORS

  
// Aplicar CORS solo a la ruta /users
app.use(authRoute, cors(corsOptions));
app.use(usersRoutes, cors(corsOptions));
app.use(benefitsRoutes, cors(corsOptions));
app.use(purchaseRoutes, cors(corsOptions));
app.use(transaction, cors(corsOptions));


app.listen('3001', () => console.log('Server running in port 3001')); */