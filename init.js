const mongoose=require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("Connection succesful")
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}
let allChats=[
    {
    from:"Pankaj",
    to:"c",
    message:"Hello how are you?",
    created_at: new Date()
      },
    {
    from:"Akshat",
    to:"Pankaj",
    message:"send me photos",
    created_at: new Date()
      },
    {
    from:"Chanchal",
    to:"Arti",
    message:"Can you send notes of js",
    created_at: new Date()
      },
    {
    from:"Pooja",
    to:"Arti",
    message:"where are you??",
    created_at: new Date()
      },
    {
    from:"Arti",
    to:"chanchal",
    message:"kha per ho",
    created_at: new Date()
      },
    {
    from:"chanchl",
    to:"pankaj",
    message:"can you come here.",
    created_at: new Date()
      },
];

Chat.insertMany(allChats);

