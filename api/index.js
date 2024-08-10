const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const formRoutes = require('./routes/form-routes');

app.use(cors());
app.use(express.json());
app.use('/forms', formRoutes)

const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})


// app.post('/formdata',  (req, res) => {
//   try {
//     // let { client, db } = await connectToDatabase('mongodb+srv://Shajahan4596:2Uc5nNgTP0bPTVpj@atlascluster.zht8m.mongodb.net/');

//     // const collection = await db.collection('forms');
//     // req.body['id'] = uuidv4();
//     console.log(req.body);
//     // const result = await collection.insertOne(req.body);
//     res.send(req.body);
//   } catch (error) {
//     console.log('Error', error)
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});