require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser');
const requireAuth = require('./middleware/requireAuth')

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = "mongodb+srv://admin:admin@cluster0.xmg5pab.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
});

mongoose.connection.on("connection", () => {
	console.log("connected successfully");
})

mongoose.connection.on("Error", (err) => {
	console.log("not connected", err);
})

app.get('/', requireAuth, (req, res) => {
	res.send(`Hi there! your email ${req.user.email}`)
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
