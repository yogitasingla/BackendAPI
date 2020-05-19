class MessageUtil{

    static getMessage(){
         return {
        Unable_Fetch:"Unable tp fetch the response",
        CONVERSATION_END_MSG:"To start with, I have sent you a link on this number. Please open the link, and i will guide you to fill the details.",
        WELCOME:"Hello! Welcome to Reliance General Insurance. I am RIVA your virtual assistant.",
        ASSIST :"I will assist you in filing your claim request with us, and I hope! everyone is in good health after accident.",
         FORMAT_ERROR :"fill the details in correct format",
         allDetail:"please fill all the details",
         alexist:'error: user already exist,please fill the new details',
        userNE :'user not exist',
        loginS:'login sucessfull',
        loginUn:'login failed',
        fail:'fail in saving into database',
        sucess:'sucess'

           }
    }

    static get(){
        if(arguments.length < 1)
        return '';
       let key = this.getMessage()[arguments["0"]];
       for(let i in arguments){
        if(i != "0")
         key = key.replace("@ARGU@",arguments[i]);
       }
       return key;
    }

}

module.exports = MessageUtil;