const mongoose=require('mongoose')

const ConnectDB=async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
           useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongo DB Connectd')
    }catch(error){
        console.log('MongoDB Connection Failed',error)
    }
}
module.exports=ConnectDB;