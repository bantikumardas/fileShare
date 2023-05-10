require('dotenv').config();
const mongoose=require('mongoose');


//second time password=OKQjd0uaQZO0MmCA
//user=inShare
function connectDB(){
    //database connnection
    mongoose.connect( process.env.MONGO_CONNECTION_URL , { useNewUrlParser: true, 
        useUnifiedTopology: true}).then(()=>{
            console.log('Database connected');
        }).catch((err)=>{
            console.log("not connected");
            console.log(err);
        });
    
}

module.exports=connectDB;