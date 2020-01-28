const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
// connect database
connectDB();

//init middleware
app.use(express.json({extended:false}));
app.use(cors())

//Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/birthdays',require('./routes/birthdays'));


app.get('/',(req,res)=> res.json({msg:'Hello i am succefuly executed'}));
app.listen(PORT,() => console.log(`server started on port: ${PORT} `));
