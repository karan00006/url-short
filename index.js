const express = require('express');

const { connectDB } = require('./connect');
const urlRoute = require('./routes/url');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB('mongodb://localhost:27017/short-url')
.then(()=> console.log('DB connected!'));

app.use('/url', urlRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});