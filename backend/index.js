require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./helpers/dbhelper');

// my routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const customerRoutes = require('./routes/customer');

const app = express();

db.connection();

app.use(bodyParser.json());
app.use('/images',express.static('images'))
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());
app.use(cors());

//routers
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/customer', customerRoutes);

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`app running in ${port}`);
});
