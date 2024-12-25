var express = require('express');
var products=require('../models/product');
const { response } = require('../app');
var router = express.Router();
/*Get products */
router.get("/products",(req,res)=>{
  products.find({})
  .then((data)=>res.send(data))
  .catch((err)=>{res.send(err)})
})

/* ADD Products. */
router.post("/add",(req,res)=>{
  var newproduct =new products(req.body);
  newproduct.save()
  .then(()=>res.send({result:"Success",response:newproduct}))
  .catch((err)=>console.log(err))
})
/* get by id Products. */
router.get("/products/:id",(req,res)=>{
  products.findOne({productID:req.params.id})
  .then((ooo)=>res.send(ooo))
  .catch((err)=>console.log(err))
})
/* update Products. */
router.put("/update/:id",(req,res)=>{
  products.findByIdAndUpdate(req.params.id,req.body)
  .then((result)=>res.send({status:"Succcess",response:result}))
  .catch((err)=>console.log(err))
})
/* delete product*/
router.delete("/delete/:id",(req,res)=>{
  products.findByIdAndDelete(req.params.id)
  .then((result)=>res.send({status:"Success",response:result}))
  .catch((err)=>console.log(err));
})
/*DELETE ALL */
// router.delete("/deleteall",(req,res)=>{
//   app.delete(req.body)
//   .then((res)=>res.send({status:"Success",result:res}))
//   .catch(()=>console.log(err))
// })

/*SAVE by using another method */
router.post("/save",(req,res)=>{
  products.create(req.body)
  .then(()=>res.send("Array of Products added succesfully"))
  .catch((err)=>console.log(err))
})
/* Adding many products in a single time*/ 
router.post("/addmany",(req,res)=>{
  products.insertMany(req.body)
  .then((result)=>res.send({status:"Success",response:result})) 
  .catch((err)=>console.log(err))
  })
/*get products min&max than given price */
 router.get("/getproducts",(req,res)=>{
  const {minprice,maxprice}=req.query;
  console.log(this.productPrice)
  products.find({productPrice:{$gt:minprice,$lt:maxprice}})
  
  .then((result)=>res.send(result))
  .catch((err)=>console.log(err))
 })


 /*get products greater than given price */
 router.get("/getpro",(req,res)=>{
  const {price}=req.query;
  products.find({productPrice:{$gt:price}})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
 })
 /*Pagination among... */
router.get("/pagination",(req,res)=>{
  const {page,limitnum}=req.query;
  const skipnum=(page-1)*limitnum;
  products.find({}).skip(skipnum).limit(limitnum)
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})

/*Search API*/
router.get("/search",(req,res)=>{
  const{name}=req.query;
  products.find({productName:new RegExp(name,"i")})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})
module.exports = router;
