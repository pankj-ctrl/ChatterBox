const express= require("express");
const app = express();
const path = require("path");
const mongoose=require("mongoose");
const Chat = require("./models/chat.js");

const methodOverride=require("method-override");
const ExpressError=require("./expressError");


main().then(()=>{
    console.log("Connection succesful")
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"))

// index route

app.get("/chats",asyncWrap(async (req,res)=>{
     let chats= await Chat.find();
     res.render("index.ejs",{chats});
}))

// New route

app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404,"Page not found");
    res.render("new.ejs");
    
})

// Create route
app.post("/chats",asyncWrap(async(req,res)=>{
    let {from,message,to}=req.body;
    let newchats= new Chat({
        from:from,
        message:message,
        to:to,
        created_at: new Date(),
    });

    await newchats.save();
    res.redirect("/chats");
}))

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err)
        })
    }
}

// show routes
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        next(new ExpressError(404,"chat not found"));
    }
    res.render("edit.ejs",{chat});
}))

// Edit route
app.get("/chats/:id/edit",asyncWrap(async(req,res)=>{
    let {id}= req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs",{chat})
}))


// update route
app.put("/chats/:id",asyncWrap(async (req,res)=>{
   let {id}= req.params;
   let {message:newMsg}=req.body;
   let updatedChat = await Chat.findByIdAndUpdate(id,{message:newMsg},{runValidators:true,new:true});
   res.redirect("/chats")
}))

// Delete route

app.delete("/chats/:id",asyncWrap(async (req,res)=>{
    let{id}= req.params;
    let deleteChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
}))

app.get("/",(req,res)=>{
    res.send("This is root");
})

const handleValidationError=(err)=>{
  console.log("This is validation error");
  return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==="ValidationError"){
        err=handleValidationError(err);
    }
    next(err);
})
// Error handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="some error occured"}=err;
    res.status(status).send(message);
    
})
app.listen(8080,()=>{
    console.log("8080 is listening");
})