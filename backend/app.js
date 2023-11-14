const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const restaurantRoute = require('./Routes/restaurantsRoute');
const locationRoute = require('./Routes/locationRoute');
const mealtypeRoute = require('./Routes/mealtypeRoute');
const loginSignup = require('./Routes/loginsignupRoute');
const payment = require('./Routes/paymentRoute')
const cors = require('cors');
const app = express();
const Port = 8800;
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
        w: 'majority',
      },
});

app.use(cors());

app.use(bodyParser.json());

app.use('/', restaurantRoute);
app.use('/', locationRoute);
app.use('/', mealtypeRoute);
app.use('/', loginSignup);
app.use('/', payment)


app.listen(Port, ()=>{
    console.log("server running at" , Port);
})