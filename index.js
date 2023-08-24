const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

//connection to db
mongoose.connect(process.env.mongoURL)
.then(() => {
    console.log('Connected To DB');
}).catch((error) => {
    console.error(error);
})

app.use(express.json());

//Routes

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})