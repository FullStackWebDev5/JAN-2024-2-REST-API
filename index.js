const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded())

const User = mongoose.model('User', { //users
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
})

app.get('/', (req, res) => {
  res.send('We are going to learn how to connect MongoDB to Nodejs Server');
});

// READ: GET /users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            status: 'SUCCESS',
            data: users
        });
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'Something went wrong'
        })
    }
});

// CREATE: POST /users
app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        await User.create({ firstName, lastName, email, phone })
        res.json({
            status: 'SUCCESS',
            message: 'User created successfully'
        });
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'Something went wrong'
        })
    }
});

// UPDATE: PATCH /users/:id
app.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone } = req.body;
        await User.findByIdAndUpdate(id, { firstName, lastName, email, phone })
        res.json({
            status: 'SUCCESS',
            message: 'User updated successfully'
        });
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'Something went wrong'
        })
    }
});


// DELETE: DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id)
        res.json({
            status: 'SUCCESS',
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'Something went wrong'
        })
    }
});

app.listen(process.env.PORT, () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('Server is running :)'))
      .catch((error) => console.log(error));
});




























/*
  ## Database (DB): Permanent Storage
  - Two types:
      - 1. SQL (Relational DB)
          - Table and Row format
          - Eg: MySQL, PostgreSQL, SQLite, etc
      - 2. NoSQL (Non-Relational DB)
          - Collection and Document format
          - Eg: MongoDB, AWS DynamoDB, etc

  ## MERN: MongoDB, Express.js, React.js, Node.js

  ## MongoDB
    - Mongoose: MongoDB Driver/ ODM (Object Data Modelling)
        - .model (Define schema for collection's document)
            - Model name: Pascal Case, Singular
            - Collection name: lowercase, Plural

  ## REST APIs: CRUD Opearations, HTTP Methods
    # CRUD Opearations
    - Create: POST - .post()
    - Read: GET - .get()
    - Update: PATCH .patch()
    - Delete: DELETE - .delete()

    # HTTP methods:
    - Read: .get()
    - Create: .post()
    - Update: .patch()
    - Delete: .delete()

    # Mongoose methods:
    - Read: .find()
    - Create: .create()
    - Update: findByIdAndUpdate()
    - Delete: findByIdAndDelete()

    - Eg: 
        - Students
            - Read: GET /students
            - Create: POST /students + data
            - Update: PATCH /students/:id + data
            - Delete: DELETE /students/:id
        
        - Products
            - Read: GET /products
            - Create: POST /products + data
            - Update: PATCH /products/:id + data
            - Delete: DELETE /products/:id

    # Middleware (Future)
        - bodyParser
        - app.use() -> connecting middleware to server

    # Query Parameters
*/