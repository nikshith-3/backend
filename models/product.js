var mongoose=require('mongoose')
var productSchema=mongoose.Schema({
    productID:Number,
    productName:String,
    productDescription:String,
    productPrice:Number,
})
var product=mongoose.model("products",productSchema);
module.exports=product;