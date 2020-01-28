const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongooseURI');

const connectDB = () =>{
    mongoose.connect(db,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    });
    mongoose.connection.on('connected',() =>{
        console.log("MongoDb Connected");
        
    })
    mongoose.connection.on('error',() =>{console.log("error");
    })

}

    
    

    


module.exports = connectDB;