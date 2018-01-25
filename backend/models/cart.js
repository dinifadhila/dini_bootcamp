const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bootkem5",{useMongoClient:true})


const cartscm = new mon.Schema({
    ProductId:String,
    ProductName:String,
    Picture:String,
    Price:Number,
    Quantity:Number,
})

const cart = mongoose.model("cart",cartscm)

module.exports=cart;