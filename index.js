const express = require("express");
const bp=require("body-parser");
const ejs=require("ejs");
const mongoose = require("mongoose");
const app=express();
app.use(bp.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static("public"));





//mongodb+srv://ph:ph123@cluster0.3toix.mongodb.net/myFirstDatabase
//mongodb+srv://Paras:Paras%402001@cluster0.9t5bt.mongodb.net/todoDB
mongoose.connect("mongodb+srv://ph:ph123@cluster0.3toix.mongodb.net/myFirstDatabase");
const itemSchema={
    name:String,
    email:String,
    ph:String,
    desc:String,
    price:String,
    addres:String,

};
const listPapaSchema={
    title:String,
    items:[itemSchema]
   };
   
const ApronList=mongoose.model("ApronList",itemSchema);
const LenDenList=mongoose.model("LenDenList",listPapaSchema);
//const item1= new ApronList({name:"1",price:"1"});


const array=[];
const electronicsItem= new LenDenList( {title:"electronics", items:array});
//LenDenList.insertMany([electronicsItem]);
var a="a";
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.get("/" , (req,res)=>{
    res.sendFile(__dirname + "/" + "home.html");
})
app.get("/list/:id",(req,res)=>{
    var id=req.params.id;
    console.log(id);
    LenDenList.findOne({title:id},(err,foundList)=>{
        //if(err) console.log(err)
        console.log(foundList);
        res.render("list", {array:foundList.items});
    });
    
})

app.post("/addItem",(req,res)=>{
    console.log(req.body);
    var title=req.body.gridRadios;
    var item2= new ApronList({
        name:req.body.name,
        price:req.body.price,
        email:req.body.email,
        //desc:req.body.desc
    });
    LenDenList.findOne({title:title},(err,foundList)=>{
    foundList.items.push(item2);
    foundList.save();
    })
 res.redirect("/");
});
app
app.listen(3000);