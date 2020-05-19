const config = require('../common/config-util');
const MessageUtil = require('../common/message-util');
require("dotenv").config();
const RestUtil = require('../common/rest-util');
const UserService = require('../services/gallery-service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const upload = multer();
// var redis = require('redis');
// var JWTR =  require('jwt-redis').default;
// var redisClient = redis.createClient();
// var jwtr = new JWTR(redisClient);


class WebhookController 
{
    constructor()
     {
        this.userService = new UserService(config);
        this.restUtil = new RestUtil();
        this.onlogin=this.onlogin.bind(this);
        this.onSignup=this.onSignup.bind(this);
        this.ondelete=this.ondelete.bind(this);
        this.onlogout=this.onlogout.bind(this);
    }

//api for signup

     async onSignup(req,res){
         try{
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let data=
            {
                email:req.body.email,
                password:req.body.password
                
            }
            if(data.email==""||data.password=="")
            {
                res.send({"message":MessageUtil.getMessage().allDetail,"status": "fail"});
            }
             if(data.email.match(mailformat)){
                 let emaildata={"email":data.email};
                 let user= await this.userService.getUser(emaildata);
                 if(user[0])
                 {
                    res.send({"message":MessageUtil.getMessage().alexist,"status":"fail"}); 
                 }
                 else{
                    let password = await bcrypt.hash(data.password,10);
                    

                     data.password = password;
                     
                     let value = await this.userService.saveDetails(data);
                     if(value){
                        
                        res.send({"message":MessageUtil.getMessage().sucess,"status":"true"});
                     }
                     else{
                        res.send({"message":MessageUtil.getMessage().fail,"status":"fail"});
                     }
                 }

                 
            }
            else{
                res.send({"message":MessageUtil.getMessage().FORMAT_ERROR,"status":"fail"});
            }



         }catch(e){
            console.log('Error!', e);
              res.setHeader('Content-Type', 'application/json');
              res.send(MessageUtil.getMessage().Unable_Fetch);
              res.end(); 
         }
     } 
//api for admin login 


async onadminlogin(req,res){
    try{
        let emaildata={
            email:'admin@email.ad',
            password:'admin'
        }
        let data=
            {
                email:req.body.email,
                password:req.body.password
                
            }
        if(emaildata.email==data.email&&emaildata.password==data.password){
            
            const token= jwt.sign({
                email:data.email,
                
            },
            process.env.JWT_KEY
            );

           return res.status(200).json({
               message:"Auth sucessfull",
               token:token
           });  
            
        }
       
        else{   
             
            return res.status(401).json({
                message:"Auth fail",
                token:null
            });
        }

    }catch(e){
        console.log('Error!', e);
              res.setHeader('Content-Type', 'application/json');
              res.send(MessageUtil.getMessage().Unable_Fetch);
              res.end();  
    }

}

//api for login 

      async onlogin(req,res){
          try{
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           
            let data=
            {
                email:req.body.email,
                password:req.body.password
                
            }
            if(data.email==""||data.password=="")
            {
                res.send({"message":MessageUtil.getMessage().allDetail,"status": "fail"});
            }
             if(data.email.match(mailformat)){
                 let emaildata={"email":data.email};
                 let user= await this.userService.getUser(emaildata);
                 if(user[0])
                 {
                    bcrypt.compare(data.password,user[0].password,(err,result)=>{
                        if(err){
                            return res.status(401).json({
                                message:"Auth fail"
                            });
                        }
                        if(result){

                          const token= jwt.sign({
                                 email:user[0].email,
                                 userId:user[0]._id
                             },
                             process.env.JWT_KEY
                             );

                            return res.status(200).json({
                                message:"Auth sucessfull",
                                token:token
                            });  
                        }
                        else{
                            return res.status(401).json({
                                message:"Auth fail",
                                token:null
                            });
                        }

                    });
                 }
                 else{
                    res.send({"message":MessageUtil.getMessage().Unable_Fetch,"status":"fail"}); 
                 }
                 
            }
            else{
                res.send({"message":MessageUtil.getMessage().FORMAT_ERROR,"status":"fail"});
            }




          }catch(e){
            console.log('Error!', e);
            res.setHeader('Content-Type', 'application/json');
            res.send(MessageUtil.getMessage().Unable_Fetch);
            res.end(); 

          }

      }

//api for upload images

// async onuploadimage(req,res){
// try{
    
//     if(req.file){
//     return res.json({
//         success: true,
//         message: 'uploading image sucessfully'
//     })
//     }
//     else{
//         return res.json({
//             success: false,
//             message: 'Failed in uploading images'
//         })
//     }

// }catch(e){
//     console.log('Error!', e);
//             res.setHeader('Content-Type', 'application/json');
//             res.send(MessageUtil.getMessage().Unable_Fetch);
//             res.end(); 
// }
// }


//api for logout


async onlogout(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
       // jwtr.destroy(token);
        res.send(token);
        next();

    }catch(e){
        console.log('Error!', e);
            res.setHeader('Content-Type', 'application/json');
            res.send(MessageUtil.getMessage().Unable_Fetch);
            res.end(); 
    }

}


     async ondelete(req,res){
         try{
            var data = req.params._id;
            console.log(data);
            let user= await this.userService.deleteuser(data);
            console.log(user);
            console.log(user[0]);
            if(user[0]){
                res.send({"message":MessageUtil.getMessage().sucess,"status":"true"});

            }
            else{
                res.send({"message":MessageUtil.getMessage().fail,"status":"fail"});
            }



         }catch(e){
            console.log('Error!', e);
              res.setHeader('Content-Type', 'application/json');
              res.send(MessageUtil.getMessage().Unable_Fetch);
              res.end(); 
         }
     }









    
 }




module.exports = WebhookController;