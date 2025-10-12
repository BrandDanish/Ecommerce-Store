const dotenv=require('dotenv')
dotenv.config()
const ConnectDB=require('./database/db')
ConnectDB()
const userRoute=require('./route/UserRoute')
const ContactRoute=require('./route/ContactRoute')
const OrderRoute=require('./route/OrderRoute')
const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
 res.send("Helo World")
});
app.use('/user',userRoute)
app.use("/api", ContactRoute);
app.use('/order',OrderRoute)
module.exports=app;