

// app.js

require('dotenv').config();
//require('express-async-errors');

const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

app.use(express.static("public"));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();