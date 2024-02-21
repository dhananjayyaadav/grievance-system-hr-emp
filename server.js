const express = require('express');
const bodyParser = require('body-parser');
const Connection = require('./db/db.js');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

   
const app = express();             
// app.use(cors());
app.use(bodyParser.json({extended : true }))
app.use(bodyParser.urlencoded({extended : true }))

const PORT = 4000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

  //  DefaultData();


// const app = express();
// const port = 4000;

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});
// MongoDB Connection
// mongoose.connect('mongodb://localhost/grievance_system', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
const authRoutes = require('./routes/authRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/auth', authRoutes);
app.use('/grievances', grievanceRoutes);
app.use('/chat', chatRoutes);

// Start Server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
Connection(USERNAME,PASSWORD);
  app.listen(PORT, () => console.log(`Server is running successfully on Port ${PORT}`));
