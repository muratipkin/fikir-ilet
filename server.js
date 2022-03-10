//import express from 'express';
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const Fikir=require("./models/Fikir");
const Admin=require("./models/Admin");

const app=express();
app.use(cors());
app.use(bodyParser.json());
const PORT=process.env.PORT || 5555;

mongoose.connect("mongodb://localhost:27017/fikirilet",{useNewUrlParser:true},err=>{
    if(err) throw err
    console.log("Mongoose ile Bağlantı Başarılı");
});

/*app.get("/admincreate",(req,res)=>{
    Admin.create({
        username:"mipkin",
        password:"1234"
    },err=>{
        if(err) throw err;
        res.sendStatus(200);
    });
});*/
app.post("/giris",(req,res)=>{
    const {username,password}=req.body;
    Admin.find({username}).then(doc=>{
        if(doc[0].password===password)
            res.send("Giriş Başarılı");
        else
            res.sendStatus(404);
    });
});
app.get("/fikirler",(req,res)=>{
    Fikir.find().then(docs=>res.send(docs));
});
app.post("/fikirkaydet",(req,res)=>{
    //console.log(req.body);
    const{tamIsim,email,fikirTuru,fikir}=req.body;
    Fikir.create({
        tamIsim:tamIsim,
        email:email,
        fikirTuru:fikirTuru,
        fikir:fikir
    },err=>{
        if(err) throw err;
        res.sendStatus(200);
        //console.log("Kaydedildi");
    });
});
app.listen(PORT,()=>console.log(`Server ${PORT} Portunu Kullanıyor`));