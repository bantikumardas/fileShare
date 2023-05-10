const express=require('express');
const app=express();
const path=require('path');

const PORT=process.env.PORT || 4000;

const connectDB=require('./config/db');
connectDB();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


//routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`);
})