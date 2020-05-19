
const axios = require('axios');

class RestUtil {
    constructor() {
        this.instance = axios.create({
            timeout: 180000
        });
        this.postRequest=this.postRequest.bind(this);
        this.putRequest=this.putRequest.bind(this);
        this.getRequest=this.getRequest.bind(this);
        this.deleteRequest=this.deleteRequest.bind(this);
    }

    async getRequest(path,options){
        try {
            const response = await this.instance.get(path,options);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async postRequest(path,data,options){
        try {
            const response = await this.instance.post(path,data,options);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async putRequest(path,data,options){
        try {
            const response = await this.instance.put(path,data,options);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deleteRequest(path,data,options){
        try {
            const response = await this.instance.delete(path,data,options);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = RestUtil;
