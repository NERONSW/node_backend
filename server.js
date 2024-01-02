const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;
const mongodb_url = process.env.MONGO_DB_URL;

app.get('/', (req, res) => {
	res.send('Backend running successfully!');
	console.log('Backend running successfully!');
});

require('./routes/index.js')(app);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);

	mongoose
		.connect(mongodb_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			//don't show the log when it is test
			if (process.env.NODE_ENV !== 'test') {
				console.log('App is running ... \n');
				console.log('Press CTRL + C to stop the process. \n');
			}
		})
		.catch((err) => {
			console.error('App starting error:', err.message);
			process.exit(1);
		});
});
