const router =require("express").Router();
const multer=require('multer');
const path=require("path");
const File=require('../models/file');
const {v4: uuid4}=require('uuid');


let storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
      },
    filename: (req, file, cb) =>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()* 1E9)}${path.extname(file.originalname)}`;
        // 34678988-123456789.zip
        cb(null, uniqueName);
    }
});

let upload=multer({
    storage: storage,
    limits:{fileSize: 1000000*100},
}).single('myfiles');


router.post('/', (req, res)=>{
    
    console.log(`request for file uploads`);
    //store file
    upload(req, res, async (err)=>{
        // validate request
        
        if(!req.file){
            console.log(`${req.file} no file`);
            return res.json({error : 'All filed are required'});
        }
        if(err){
            console.log(`some error occured`)
            return res.status(500).send({error: err.message}); // dought
        }
        // store into database
        const file=new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            uuid: uuid4()
        });

        const response =await file.save();
        console.log(`${path.join(__dirname, '../uploads', req.file.filename)}`);
        console.log(response);
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        //http://localhost:3000/files/267476jndkdsj-234352njknsdi
    });

   

    //Response-> link
});

module.exports=router;