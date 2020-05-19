var express= require('express');
var cors = require("cors");
var bodyParser= require('body-parser');
var mongoose = require('mongoose');

mongoose.promise=global.promise;
mongoose.connect("mongodb://localhost:27017/images",
{useNewUrlParser:true, useUnifiedTopology: true});

var imageSchema =new mongoose.Schema
({
    uploadedImage: { type: String, required: true },
});

var MimageSchema =new mongoose.Schema
({
     uploadedMImage: { type:Array, required: true },
});

const multer = require('multer');
var app= express();
app.use(cors({ origin: "*" }));
// app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var image=mongoose.model("image",imageSchema);
var Mimage= mongoose.model("Mimage",MimageSchema);

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname );
    }
});
 const fileFilter =(req,file,cb)=>{
     //reject a file
     if(file.mimetype ==="image/png"||file.mimetype ==="image/jpeg"||file.mimetype ==="video/mp4"||file.mimetype ==="image/x-nikon-nef")
     {
     cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter});

 
 
app.post("/upload",upload.single('uploadedImage'),(req,res,next)=>{
    
    try{
     console.log(req.file);
     if(req.file){
     const  Image = new image({
         uploadedImage:req.file.path
     });
     Image
     .save()
     .then(result=>{
         console.log(result)
         
         return res.json({
            success: true,
            message: 'Sucess in uploading images in databse'
         })
     })
     .catch(err => {
        return res.status(400).json({
            status: 'error',
            error: 'Unable to save the database',
          });
       
    });
    
 }else{
        return res.json({
            success: false,
            message: 'Failed in uploading images'
        })
    }
}catch(e){
    console.log('Error!', e);
        res.setHeader('Content-Type', 'application/json');
        res.send('error');
        res.end();
   }
});

app.post('/multipleFiles', upload.array('MutipleIMages'), (req, res, next) => {
    try{
        const files = req.files;
    console.log(files);
    if (files[0])
     {
        const  Image = new Mimage({
            uploadedMImage:req.files.path
        });
        Image
        .save()
        .then(result=>{
            console.log(result)
            
            return res.json({
               success: true,
               message: 'Sucess in uploading images in databse'
            })
        })
        .catch(err => {
            return res.status(400).json({
                status: 'error',
                error: 'Unable to save the database',
              });
           
        });
    }
    else{
        return res.json({
            success: false,
            message: 'Failed in uploading images no image found'
        })
    }
    }
    catch(e){
        onsole.log('Error!', e);
        res.setHeader('Content-Type', 'application/json');
        res.send('error');
        res.end();
     
    }
    
});









module.exports=app;