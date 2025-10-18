const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index.js');

const compoundRouter = require('./routers/compound.routers.js');
const authRouter = require('./routers/auth.routers.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRouter);

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error connecting to the database:', err));

app.use('/api/compound', compoundRouter);

module.exports = { app };