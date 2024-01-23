const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const cors=require("cors");
const Match=require("./models/match")
const User=require("./models/user");
const Comment=require("./models/comments");
require("dotenv").config()

const bcrypt =require ("bcrypt");
const jwt=require ("jsonwebtoken");
// const { default: Likes } = require("../server2/src/pages/profile/likes");

// mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/cricketArchives');

mongoose.set('strictQuery', true);

const dbUrl = process.env.dbUrl;
mongoose.connect(dbUrl)


const db=mongoose.connection;
db.on("error",console.error.bind(console,"connectin error:"));
db.once("open",()=>{
    console.log("Datbase connected");
})

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.post('/new', async (req, res)=>{
    try{
        // console.log(req.body);
        var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
        const newmatch=new Match({
          status: req.body.values.status,
          potm:req.body.values.potm,
          date:dateTime,
          srl:req.body.values.srl,
          tournament: req.body.values.tournament,
          name1:req.body.values.name1,
          name2: req.body.values.name2,
          over1: req.body.values.over1,
          over2: req.body.values.over2,
          run1:req.body.values.run1,
          run2:req.body.values.run2,
          wkt1:req.body.values.wkt1,
          wkt2:req.body.values.wkt2,
          author:req.body.user._id
        })
        
       await newmatch.save();
        res.send(newmatch);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
      }
});

app.get('/all',async(req,res)=>{
    try {
        const matches = await Match.find();
        res.send(matches);
      } catch (err) {
        console.log("error")
        res.status(404).json({ message: err.message });
      }
})

app.patch('/match/:id/like',async(req,res)=>{
  try{
    const {id}=req.params;
    const {userId,liked}=req.body;
    const match=await Match.findById(id);
    const user=await User.findById(userId)
    if(!liked){
      match.likes.push(user);
      user.likes.push(match);
    }
    else{
      match.likes.remove(user);
      user.likes.remove(match);
    }

    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      { likes: match.likes },
      { new: true }
    );

    const updatedUser= await User.findByIdAndUpdate(userId,{ likes: user.likes },
      { new: true })

    res.status(200).json({updatedMatch,updatedUser});

  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})

app.post('/match/:id/comment',async(req,res)=>{
  try{
    const {id}=req.params;
    const match=await Match.findById(id);

    const comment=new Comment({
      description: req.body.values.comment,
    match: match,
    author:req.body.user._id,
    })
    match.comments.push(comment);
    await match.save();
    await comment.save();
    res.status(200).json(comment);
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})

app.delete('/match/:id',async (req, res) => {
  try{
    const { id } = req.params;
  await Match.findByIdAndDelete(id);
  res.send("deleted")
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
})

app.get('/match/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const match= await Match.findById(id).populate({
          path: 'comments',
          populate: {
              path: 'author'
          }
      }).populate('author');
        res.send(match);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
})

app.get('/user/:id',async(req,res)=>{
  try{
    const {id}=req.params;
    const user=User.findById(id);
    res.send(user);
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})

app.put('/match/edit/:id',async(req,res)=>{
  try {
      const { id } = req.params;
      const match = await Match.findByIdAndUpdate(id, { ...req.body });
      // console.log(match);
      res.send(match);
    } catch (err) {
      res.send(err);
    }
})

app.post("/user/signup",async(req,res)=>{
  try{
    const{username,password,email}=req.body;
    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);

    const newuser=new User({
      username,email,password:passwordHash
    })
    const savedUser=await newuser.save();
    const token=jwt.sign({id:savedUser._id},"secret");
    res.send({token,savedUser});
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})

app.get("/user/:id/posts",async(req,res)=>{
  try{
    const {id}=req.params;
    // const user=await User.find({id})
    const match=await Match.find({author:id});
    // console.log(match);
    // if(comments)
    res.status(200).json(match);
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})

app.get("/user/:id/comments",async(req,res)=>{
  try{
    const {id}=req.params;
    const comments=await Comment.find({author:id});
    // console.log(comments);
    if(comments)
    res.status(200).json(comments);
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})


app.get("/user/:id/likes",async(req,res)=>{
  try{
    const {id}=req.params;
    const user=await User.findById(id).populate({
      path: 'likes',
      populate: {
          path: 'author'
      }
  });

  res.status(200).json(user.likes);
     
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
})

app.delete('/comment/:id',async (req, res) => {
  try{
    const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.send("deleted")
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
})

app.post("/user/login",async(req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    // console.log(user)
    const token = jwt.sign({ id: user._id }, "secret");
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", 3000);
});

