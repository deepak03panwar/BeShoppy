const port = 4000;
const express = require('express');
const Razorpay = require("razorpay");  
const crypto = require("crypto");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());



// Database connection with mongodb razorpay key = rzp
//_test_95S9XZy73efVM6
// Secretkey = rUBwHqqrP53aWPEpcSoC4Ty9
mongoose.connect("mongodb+srv://pradeep222120124:QWERTYuiopASDFGHjkl@cluster0.wna1xrx.mongodb.net/e-commerce");

// API Creation

app.get("/",(req,res)=>{
    res.send("Express app is Running")
})


app.post("/order" , async (req,res) => {

    try{
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_ID
        });

        if(!req.body){
            return res.status(400).send("Bad Request");
        }
        const options = req.body;
        const order = await razorpay.orders.create(options);
        if(!order){
            return res.status(400).send("Bad Request");
        }
        res.send(order);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})
// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
 
const upload = multer({storage:storage})

// Creating Upload Endpoint for images


app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating product

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:null,
    },
    image:{
        type:String,
        required:true,
    },
    url: {
        type: String, 
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        requird:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true
    },
    description:{
        type:String,
        required:true
    },
})

app.post('/addproduct',async (req,res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
         let last_product_array = products.slice(-1);
         let last_product = last_product_array[0];
         id = last_product.id+1;
    }
    else
    {
       id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        url:req.body.url,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        description:req.body.description,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API For deleting Products

app.post('/removeproduct',async (req,res) => {
      await Product.findOneAndDelete({id:req.body.id});
      console.log("Removed");
      res.json({
        success:true,
        name:req.body.name
      })
})

//Creating API for getting all products

app.get('/allproducts',async (req,res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


//Schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Craeting Endpoint for registering the user

app.post('/signup',async (req,res) => {
    
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart = {};
    
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

// creating endpoint for user login

  app.post('/login',async (req,res) =>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
        // res.send(user);    
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
  })

  // creating endpoint for new collection data
   app.get('/newcollections',async (req,res) =>{
        let products = await Product.find({});
        let newcollection = products;
        console.log("New Collection Fetched");
        res.send(newcollection);
   })

 // creating endpoint for popular in women section
 app.get('/popularinwomen',async (req,res)=>{
       let products = await Product.find({category:"women"});
       let popular_in_women = products.slice(1).slice(-8);
       console.log("Popular in women fetched");
       res.send(popular_in_women);
 })

 app.get('/relatedProducts',async (req,res)=>{
    let products = await Product.find({});
    let popular_in_women1 = products;
    console.log("Popular in women fetched");
    res.send(popular_in_women1);
})

// creating middlware to fetch user
   const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else{
            try{
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            } catch(error){
                res.status(401).send({errors:"please authenticate using a valid token"})
            }
        }
   }


// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res) => {
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async (req,res) =>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

app.post('/removefromcart1',fetchUser,async (req,res) =>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    // if(userData.cartData[req.body.itemId]>0)
    //    userData.cartData[req.body.itemId]=0;
    if (userData.cartData[req.body.itemId] > 0) {
        delete userData.cartData[req.body.itemId];
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// creating endpoint to get cartData
app.post('/getcart',fetchUser,async (req,res)=>{
       console.log("GetCart");
       let userData = await Users.findOne({_id:req.user.id});
       res.json(userData.cartData);
})

app.listen(4000,(error)=>{
    if(!error){
        console.log("Server Running on Port " + port)
    }
    else 
    {
        console.log("Error :" +error )
    }
})
