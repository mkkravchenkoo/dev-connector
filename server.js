const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();


//init middleware
app.use(express.json({extended:false})); // need for getting request in json

// define routes
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.get('/', (req, res) => {
	res.send('API running')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));