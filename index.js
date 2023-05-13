const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');



const PORT=process.env.PORT || 4000;

const connectDB=require('./config/db');
connectDB();

const corsOptions={
    origin: process.env.ALLOWED_CLIENTS.split(",")
}
app.use(cors(corsOptions));

const fetchData=require('./script');
setInterval(fetchData, 1000*60*60);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


//routes

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.use('/', (req, res)=>{
    res.json({message:"hello this is banti"});
});
app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`);
})