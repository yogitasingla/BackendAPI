// const multer = require('multer');

 class uploadUtil{
    

//     storage = multer.diskStorage({
//         destination: function(req,file,cb){
//             cb(null,'./uploads/');
//         },
//         filename:function(req,file,cb){
//             cb(null, Date.now() + '-' +file.originalname );
//         }
//     });
//      static fileFilter =(req,file,cb)=>{
//          //reject a file
//          if(file.mimetype ==="image/jpeg"||file.mimetype ==="image/png"||file.mimetype ==="image/x-nikon-nef")
//          {
//          cb(null,true);
//         }
//         else{
//             cb(null,false);
//         }
//     }
//     static upload = multer({storage:storage, fileFilter:fileFilter});
    
    
}

module.exports = uploadUtil;