const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors=require('cors')
const router = require('./routes/book-routes')


//Middleware
app.use(express.json())
app.use(cors())
app.use('/books', router);

//DB Connection
mongoose.connect('mongodb+srv://Kiran:O@cluster0.pmojmpa.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('Database Connected'))
    .catch((err) => console.log(err))


app.listen(5000, console.log('Express Running '))