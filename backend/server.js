require('dotenv').config();
   const express = require('express');
   const cors = require('cors');
   const mongoose = require('mongoose');
   mongoose.set('strictQuery', false);

   const app = express();

   app.use(cors());
   app.use(express.json());

   const uri = process.env.MONGODB_URI;
   mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

   const connection = mongoose.connection;
   connection.once('open', () => {
     console.log("MongoDB database connection established successfully");
   });

   const authRouter = require('./routes/auth');
   const tasksRouter = require('./routes/tasks');

   app.use('/api/auth', authRouter);
   app.use('/api/tasks', tasksRouter);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server is running on port: ${PORT}`);
   });