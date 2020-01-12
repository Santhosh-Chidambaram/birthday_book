const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

//Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/birthdays',require('./routes/birthdays'));



app.get('/',(req,res)=> res.json({msg:'Hello i am succefuly executed'}));
app.listen(PORT,() => console.log(`server started on port: ${PORT} `));
