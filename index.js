const express= require("express");
const app = express();
const path = require("path");
const mongoose=require("mongoose");
const Chat = require("./models/chat.js");
const { stripVTControlCharacters } = require("util");
const methodOverride=require("method-override");


main().then(()=>{
    console.log("Connection succesful")
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"))

// index route

app.get("/chats",async (req,res)=>{
     let chats= await Chat.find();
     res.render("index.ejs",{chats});
})

// New route

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

// Create route
app.post("/chats",(req,res)=>{
    let {from,message,to}=req.body;
    let newchats= new Chat({
        from:from,
        message:message,
        to:to,
        created_at: new Date(),
    });

    newchats.save().then((res)=>{
        console.log("Chat was saved");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
})

// Edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}= req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs",{chat})
})


// update route
app.put("/chats/:id",async (req,res)=>{
   let {id}= req.params;
   let {message:newMsg}=req.body;
   let updatedChat = await Chat.findByIdAndUpdate(id,{message:newMsg},{runValidators:true,new:true});
   res.redirect("/chats")
})

// Delete route

app.delete("/chats/:id",async (req,res)=>{
    let{id}= req.params;
    let deleteChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
})

app.get("/",(req,res)=>{
    res.send("This is root");
})

app.listen(8080,()=>{
    console.log("8080 is listening");
})