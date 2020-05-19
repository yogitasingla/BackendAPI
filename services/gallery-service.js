const RestUtil = require('../common/rest-util');
const MongoDB = require('../common/mongo-util');


class UserService{
    constructor(config){
        this.config = config;
        this.restUtil = new RestUtil();
        this.mongoDB = new MongoDB(config.get('mongodb:url'));
        this.getUser= this.getUser.bind(this);
       this.saveDetails=this.saveDetails.bind(this);
       this.deleteuser=this.deleteuser.bind(this);
        }
   async getUser(emaildata){
       let result= await this.mongoDB.findRecord("people",emaildata);
       return result;
   }
    async saveDetails(data){
        let result = await this.mongoDB.createRecord("people",data);
        
        return result; 
    }
    async deleteuser(data){
        let result= await this.mongoDB.emptyCollection("people",data);
        return result;
    }
    
}

module.exports = UserService;