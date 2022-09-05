const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html")
})

app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    };
    var jsondata = JSON.stringify(data);

    const Option = {
        method : "POST",
        auth:'SYED:2a320fbcc86c37b518980a6e0cac4c84-us13'
    }
    const url = "https://us13.api.mailchimp.com/3.0/lists/3e6f2325fc"
    const reQust =  https.request(url,Option,function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    reQust.write(jsondata);
    reQust.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
    console.log("your liserning 3000");
})

//api key: 2a320fbcc86c37b518980a6e0cac4c84-us13

//id : 3e6f2325fc